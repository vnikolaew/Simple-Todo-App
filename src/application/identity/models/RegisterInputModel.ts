import { UserModel } from "./UserInputModel";

export class RegisterInputModel extends UserModel {
   public firstName: string;
   public lastName: string;

   constructor(
      firstName: string,
      lastName: string,
      email: string,
      password: string
   ) {
      super(email, password);
      this.firstName = firstName;
      this.lastName = lastName;
   }
}
