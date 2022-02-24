import { NotFountException } from "./../../common/exceptions/ApplicationExceptions";
import { User } from "./../../../infrastructure/persistence/models/User";
import {
   ITodoItemRepo,
   ITodoItemRepository,
} from "./../../../infrastructure/persistence/repositories/TodoItemRepository";
import {
   IUserRepo,
   IUserRepository,
} from "./../../../infrastructure/persistence/repositories/UserRepository";
import { IValidator } from "../../common/IValidator";
import { CreateTodoInputModel } from "../models/CreateTodoInputModel";
import { CreateTodoOutputModel } from "../models/CreateTodoOutputModel";
import { EditTodoInputModel } from "../models/EditTodoInputModel";
import { EditTodoOutputModel } from "../models/EditTodoOutputModel";
import { Priority } from "../models/TodoItemModel";
import { TodoOutputModel } from "../models/TodoOutputModel";
import { Inject, Injectable } from "@nestjs/common";
import { ICreateTodoValidator } from "../validators/CreateTodoValidator";

export interface ITodoItemService {
   create(todoInput: CreateTodoInputModel): Promise<number>;
   edit(editTodoInput: EditTodoInputModel): Promise<EditTodoOutputModel>;
   delete(todoId: number): Promise<boolean>;
   getAllByUserId(id: User["id"]): Promise<TodoOutputModel[]>;
   toggleComplete(todoId: number): Promise<EditTodoOutputModel | null>;
}

export const ITodoItemService = Symbol.for("ITodoItemService");

@Injectable()
export class TodoItemService implements ITodoItemService {
   private readonly _todoItemRepo: ITodoItemRepository;
   private readonly _userRepo: IUserRepository;
   private readonly _todoItemValidator: IValidator<CreateTodoInputModel>;

   constructor(
      @Inject(ITodoItemRepo)
      todoItemRepo: ITodoItemRepository,
      @Inject(IUserRepo)
      userRepo: IUserRepository,
      @Inject(ICreateTodoValidator)
      todoItemValidator: IValidator<CreateTodoInputModel>
   ) {
      this._todoItemRepo = todoItemRepo;
      this._userRepo = userRepo;
      this._todoItemValidator = todoItemValidator;
   }

   async edit(editTodoInput: EditTodoInputModel): Promise<EditTodoOutputModel> {
      this._todoItemValidator.validate(editTodoInput);
      const { todoId, ...rest } = editTodoInput;

      const newTodo = await this._todoItemRepo.edit(todoId, {
         ...rest,
         priority: Priority.toNumber(rest.priority),
      });

      if (!newTodo) throw new NotFountException("Todo item does not exist.");

      return EditTodoOutputModel.from(newTodo);
   }

   async toggleComplete(todoId: number): Promise<EditTodoOutputModel | null> {
      const todo = await this._todoItemRepo.findById(todoId);

      if (!todo) {
         throw new NotFountException("Todo item does not exist.");
      }

      todo.completed = !todo.completed;

      return EditTodoOutputModel.from(await this._todoItemRepo.save(todo));
   }

   async create(todoInput: CreateTodoInputModel): Promise<number> {
      this._todoItemValidator.validate(todoInput);
      const { userId } = todoInput;

      const user = await this._userRepo.findById(userId);
      if (!user) throw new NotFountException("User not found.");

      const todoItem = CreateTodoInputModel.toTodoItem(todoInput);
      todoItem.user = user;

      const newTodo = await this._todoItemRepo.save(todoItem);
      console.log(newTodo);
      return newTodo.id;
   }

   async getAllByUserId(userId: number): Promise<TodoOutputModel[]> {
      const todos = await this._todoItemRepo.getAllByUserId(userId);
      return todos.map(TodoOutputModel.from);
   }

   async delete(todoId: number): Promise<boolean> {
      return await this._todoItemRepo.delete(todoId);
   }
}
