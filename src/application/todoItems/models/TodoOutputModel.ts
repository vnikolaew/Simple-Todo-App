import { TodoItem } from "@infrastructure/persistence/models/TodoItem";
import { Priority, TodoItemModel } from "./TodoItemModel";

export class TodoOutputModel extends TodoItemModel {
   public todoId: number;
   public completed: boolean;

   constructor(
      todoId: number,
      title: string,
      description: string,
      priority: string,
      completed: boolean
   ) {
      super(title, description, priority);
      this.todoId = todoId;
      this.completed = completed;
   }

   public static from(todo: TodoItem): TodoOutputModel {
      const { id, title, description, priority, completed } = todo;
      return new TodoOutputModel(
         id,
         title,
         description,
         Priority.toString(priority),
         completed
      );
   }
}
