import { User } from "@infrastructure/persistence/models/User";

export class UserOutputModel {
   public userId: number;
   public email: string;
   public firstName: string;
   public lastName: string;
   public todosCount: number;

   constructor(
      userId: number,
      email: string,
      firstName: string,
      lastName: string,
      todosCount: number
   ) {
      this.userId = userId;
      this.email = email;
      this.firstName = firstName;
      this.lastName = lastName;
      this.todosCount = todosCount;
   }

   public static from(user: User): UserOutputModel {
      const { id, email, firstName, lastName, todoItems } = user;
      return new UserOutputModel(
         id,
         email,
         firstName,
         lastName,
         todoItems.length
      );
   }
}
