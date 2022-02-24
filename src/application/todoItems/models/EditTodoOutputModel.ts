import { TodoItem } from "@infrastructure/persistence/models/TodoItem";
import { Priority, TodoItemModel } from "./TodoItemModel";

export class EditTodoOutputModel extends TodoItemModel {
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

   static from(todoItem: TodoItem) {
      const { id, title, description, priority, completed } = todoItem;
      return new EditTodoOutputModel(
         id,
         title,
         description,
         Priority.toString(priority),
         completed
      );
   }
}
