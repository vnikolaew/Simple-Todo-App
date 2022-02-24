import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../common/BaseEntity";
import { UserConstants } from "../common/ModelConstants";
import { TodoItem } from "./TodoItem";

@Entity({ name: "users" })
export class User extends BaseEntity<number> {
   @Column({
      name: "first_name",
      length: UserConstants.maxNameLength,
      nullable: false,
   })
   firstName!: string;

   @Column({
      name: "last_name",
      length: UserConstants.maxNameLength,
      nullable: false,
   })
   lastName!: string;

   @Column({
      name: "email",
      unique: true,
      length: UserConstants.maxEmailLength,
      nullable: false,
   })
   email!: string;

   @Column({
      name: "password",
      nullable: false,
      length: UserConstants.maxPasswordLength,
   })
   password!: string;

   @OneToMany(() => TodoItem, (todoItem) => todoItem.user, {
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      eager: true,
   })
   todoItems!: TodoItem[];

   public withFirstName(fn: string): this {
      this.firstName = fn;
      return this;
   }

   public withLastName(ln: string): this {
      this.lastName = ln;
      return this;
   }

   public withEmail(email: string): this {
      this.email = email;
      return this;
   }

   public withPassword(password: string): this {
      this.password = password;
      return this;
   }
}
