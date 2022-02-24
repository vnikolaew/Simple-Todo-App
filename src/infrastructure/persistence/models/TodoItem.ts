import { Column, Entity, Index, ManyToOne } from "typeorm";
import { TodoItemConstants } from "../common/ModelConstants";
import { BaseEntity } from "../common/BaseEntity";
import { User } from "./User";

enum TodoItemPriority {
   URGENT = 1,
   HIGH = 2,
   MEDIUM = 3,
   LOW = 4,
}

@Entity({ name: "todo_items", orderBy: { createdOn: "DESC" } })
export class TodoItem extends BaseEntity<number> {
   @ManyToOne(() => User, (user) => user.todoItems, {
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      nullable: false,
   })
   @Index("user_todo_items_index")
   user!: User;

   @Column({
      name: "title",
      length: TodoItemConstants.maxTitleLength,
      nullable: true,
   })
   title!: string;

   @Column({
      name: "description",
      length: TodoItemConstants.maxDescriptionLength,
      nullable: true,
   })
   description!: string;

   @Column({
      type: "enum",
      enum: TodoItemPriority,
      default: TodoItemPriority.LOW,
      name: "priority",
   })
   priority!: TodoItemPriority;

   @Column({ name: "completed", default: false, nullable: false })
   completed!: boolean;

   public withTitle(title: string): this {
      this.title = title;
      return this;
   }

   public withDescription(description: string): this {
      this.description = description;
      return this;
   }

   public withPriority(priority: TodoItemPriority): this {
      this.priority = priority;
      return this;
   }
}
