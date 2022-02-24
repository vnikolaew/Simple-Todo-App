import { User } from "@infrastructure/persistence/models/User";
import {
   IUserRepo,
   IUserRepository,
} from "@infrastructure/persistence/repositories/UserRepository";
import { IValidator } from "../../common/IValidator";
import { IEncryptionService } from "./EncryptionService";
import {
   ApplicationException,
   InvalidFieldException,
   NotFountException,
} from "../../common/exceptions/ApplicationExceptions";

import {
   LoginInputModel,
   RegisterInputModel,
   UserChangePasswordInputModel,
} from "../models";
import { UserOutputModel } from "../models/UserOutputModel";
import { Inject, Injectable } from "@nestjs/common";
import { IRegisterUserValidator } from "../validators/RegisterUserValidator";

export interface IIdentityService {
   register(userInput: RegisterInputModel): Promise<UserOutputModel>;
   login(userInput: LoginInputModel): Promise<UserOutputModel>;
   changePassword(
      userInput: UserChangePasswordInputModel
   ): Promise<UserOutputModel>;
}

export const IIdentityService = Symbol.for("IIdentityService");

@Injectable()
export class IdentityService implements IIdentityService {
   constructor(
      @Inject(IEncryptionService)
      private readonly _encryptionService: IEncryptionService,
      @Inject(IRegisterUserValidator)
      private readonly _registerValidator: IValidator<RegisterInputModel>,
      @Inject(IUserRepo)
      private readonly _userRepo: IUserRepository
   ) {}

   async register(userInput: RegisterInputModel): Promise<UserOutputModel> {
      this._registerValidator.validate(userInput);
      const { firstName, lastName, email, password } = userInput;

      const userWithSameEmail = await this._userRepo.findByEmail(email);

      if (userWithSameEmail)
         throw new ApplicationException("Email is already taken.");

      const hashedPassword = await this._encryptionService.hash(password);

      const user = new User()
         .withFirstName(firstName)
         .withLastName(lastName)
         .withEmail(email)
         .withPassword(hashedPassword);

      return UserOutputModel.from(await this._userRepo.save(user));
   }

   async login(userInput: LoginInputModel): Promise<UserOutputModel> {
      const { email, password } = userInput;

      // Find the user by their email:
      const user = await this._userRepo.findByEmail(email);
      if (!user) {
         throw new NotFountException(
            "User with the specified email does not exist."
         );
      }

      // Compare their password with the hashed one:
      const passwordMatch = await this._encryptionService.compare(
         user.password,
         password
      );

      if (!passwordMatch) {
         throw new InvalidFieldException("Passwords didn't match.");
      }

      return UserOutputModel.from(user);
   }

   async changePassword(
      userInput: UserChangePasswordInputModel
   ): Promise<UserOutputModel> {
      const { userId, newPassword, conrfirmationPassword } = userInput;
      if (newPassword !== conrfirmationPassword)
         throw new InvalidFieldException(
            "Passwords don't match. Make sure you enter the same password."
         );

      const user = await this._userRepo.findById(userId);

      if (!user) throw new NotFountException("User does not exist.");

      user.password = await this._encryptionService.hash(newPassword);

      return UserOutputModel.from(await this._userRepo.save(user));
   }
}
