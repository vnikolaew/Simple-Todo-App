import { TodoItem } from "@infrastructure/persistence/models/TodoItem";
import { Priority } from "./TodoItemModel";

export class EditTodoInputModel {
   public todoId: number;
   public title?: string;
   public description?: string;
   public priority?: string;

   constructor(
      todoId: number,
      title?: string,
      description?: string,
      priority?: string
   ) {
      this.todoId = todoId;
      this.title = title;
      this.description = description;
      this.priority = priority;
   }

   static from(todoItem: TodoItem) {
      const {
         user: { id },
         title,
         description,
         priority,
      } = todoItem;
      return new EditTodoInputModel(
         id,
         title,
         description,
         Priority.toString(priority)
      );
   }
}
