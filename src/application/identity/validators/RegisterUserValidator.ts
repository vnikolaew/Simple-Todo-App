import { RegisterInputModel } from "../models/RegisterInputModel";
import { Guard } from "../../common/Guard";
import { IValidator } from "../../common/IValidator";
import { UserConstants } from "../../../infrastructure/persistence/common/ModelConstants";
import { Injectable } from "@nestjs/common";

export const IRegisterUserValidator = Symbol.for("IRegisterUserValidator");

@Injectable()
export class RegisterUserValidator implements IValidator<RegisterInputModel> {
   constructor() {}

   public validate(userInput: RegisterInputModel) {
      const { email, password, firstName, lastName } = userInput;

      Guard.forStringLength(
         firstName,
         UserConstants.minNameLength,
         UserConstants.maxNameLength,
         "First name"
      );
      Guard.forValidEmail(email);
      Guard.forStringLength(email, 0, UserConstants.maxEmailLength);
      Guard.forStringLength(
         lastName,
         UserConstants.minNameLength,
         UserConstants.maxNameLength,
         "Last name"
      );
      Guard.forStringLength(
         password,
         UserConstants.minPasswordLength,
         UserConstants.maxPasswordLength,
         "Password"
      );
   }
}
