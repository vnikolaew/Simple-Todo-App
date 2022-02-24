import { DbContext, IDbContext } from "../DbContext";
import { TodoItem } from "../models/TodoItem";
import { User } from "../models/User";
import { BaseRepository } from "../common/BaseRepository";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export abstract class ITodoItemRepository extends BaseRepository<TodoItem> {
   abstract getAllByUserId(id: User["id"]): Promise<TodoItem[]>;

   abstract edit(
      todoId: TodoItem["id"],
      newTodo: Partial<TodoItem>
   ): Promise<TodoItem | null>;
}

export const ITodoItemRepo = Symbol.for("ITodoItemRepo");

@Injectable()
export class TodoItemRepository extends ITodoItemRepository {
   constructor(@Inject(IDbContext) { todoItems }: DbContext) {
      super(todoItems);
   }

   async getAllByUserId(id: User["id"]): Promise<TodoItem[]> {
      const todos = await this._data.find({
         where: { user: { id } },
         relations: ["user"],
      });
      return todos;
   }

   async edit(
      todoId: number,
      newTodo: Partial<TodoItem>
   ): Promise<TodoItem | null> {
      const todoItem = await this._data.findOne(todoId);
      if (!todoItem) return null;

      Object.assign(todoItem, newTodo);
      return await this._data.save(todoItem);
   }

   async delete(todoId: number): Promise<boolean> {
      return (await this._data.delete(todoId)).affected === 1;
   }
}
