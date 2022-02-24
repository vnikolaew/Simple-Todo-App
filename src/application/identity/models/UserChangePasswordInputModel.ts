export class UserChangePasswordInputModel {
   public userId: number;
   public conrfirmationPassword: string;
   public newPassword: string;

   constructor(
      userId: number,
      confirmationPassword: string,
      newPassword: string
   ) {
      this.userId = userId;
      this.conrfirmationPassword = confirmationPassword;
      this.newPassword = newPassword;
   }
}
