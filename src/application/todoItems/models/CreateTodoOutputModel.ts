import { TodoItem } from "@infrastructure/persistence/models/TodoItem";

export class CreateTodoOutputModel {
   public todoId: number;
   constructor(todoId: number) {
      this.todoId = todoId;
   }

   public static from({ id }: TodoItem) {
      return new CreateTodoOutputModel(id);
   }
}
