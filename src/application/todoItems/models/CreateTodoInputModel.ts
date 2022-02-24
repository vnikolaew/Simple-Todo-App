import { TodoItem } from "@infrastructure/persistence/models/TodoItem";
import { Priority, TodoItemModel } from "./TodoItemModel";

export class CreateTodoInputModel extends TodoItemModel {
   public userId: number;
   constructor(
      userId: number,
      title: string,
      description: string,
      priority: string
   ) {
      super(title, description, priority);
      this.userId = userId;
   }

   public static from(todo: TodoItem) {
      const {
         user: { id },
         title,
         description,
         priority,
      } = todo;
      return new CreateTodoInputModel(
         id,
         title,
         description,
         Priority.toString(priority)
      );
   }

   public static toTodoItem(todo: CreateTodoInputModel): TodoItem {
      const { title, description, priority } = todo;
      return new TodoItem()
         .withTitle(title)
         .withDescription(description)
         .withPriority(Priority.toNumber(priority));
   }
}
