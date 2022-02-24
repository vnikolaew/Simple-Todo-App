import { Injectable, Scope } from "@nestjs/common";
import { InvalidFieldException } from "./exceptions/ApplicationExceptions";

@Injectable({ scope: Scope.DEFAULT })
export class Guard {
   // private static emailValidator: RegExp =
   //    /^[a-zA-Z0-9.!#$%^&*_+/=-<>`{|}~]+@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/;

   public static againstNull(data: any, name: string = "value") {
      if (data === null) this.throwException(`${name} cannot be null!`);
   }

   public static againstManyNull(...fields: any[]) {
      fields.forEach((f) => this.againstNull(f));
   }

   public static againstEmptyString(value: string, name: string = "value") {
      if (value.length === 0) this.throwException(`${name} cannot be empty!`);
   }

   public static forValidEmail(email: string) {
      // Check for @ and .
      if (!/^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i.test(email))
         this.throwException(`The email ${email} has an invalid format.`);
   }

   public static forStringLength(
      value: string,
      minLength: number,
      maxLength: number,
      name: string = "value"
   ) {
      if (value.length < minLength || value.length > maxLength) {
         this.throwException(
            `${name} must have between ${minLength} and ${maxLength} characters!`
         );
      }
   }

   public static forNumericRange(
      value: number,
      min: number,
      max: number,
      name: string = "value"
   ) {
      if (value < min || value > max)
         this.throwException(`${name} must be between ${min} and ${max}!`);
   }

   public static against(actualValue: any, unexpectedValue: any) {
      if (actualValue === unexpectedValue)
         this.throwException(`${actualValue} must not be ${unexpectedValue}.`);
   }

   public static throwException(message: string) {
      throw new InvalidFieldException(message);
   }
}
