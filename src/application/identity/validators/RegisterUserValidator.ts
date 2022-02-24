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

      Guard.forValidEmail(email);
      Guard.forStringLength(email, 0, UserConstants.maxEmailLength);
      Guard.forStringLength(
         password,
         UserConstants.minPasswordLength,
         UserConstants.maxPasswordLength
      );
      Guard.forStringLength(
         firstName,
         UserConstants.minNameLength,
         UserConstants.maxNameLength
      );
      Guard.forStringLength(
         lastName,
         UserConstants.minNameLength,
         UserConstants.maxNameLength
      );
   }
}
