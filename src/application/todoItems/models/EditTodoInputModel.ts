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
}
