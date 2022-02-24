import { User } from "@infrastructure/persistence/models/User";

export class UserOutputModel {
   public userId: number;
   public email: string;
   public firstName: string;
   public lastName: string;

   constructor(
      userId: number,
      email: string,
      firstName: string,
      lastName: string
   ) {
      this.userId = userId;
      this.email = email;
      this.firstName = firstName;
      this.lastName = lastName;
   }

   public static from(user: User): UserOutputModel {
      const { id, email, firstName, lastName } = user;
      return new UserOutputModel(id, email, firstName, lastName);
   }
}
