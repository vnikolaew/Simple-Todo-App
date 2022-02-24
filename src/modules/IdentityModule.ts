import {
   EncryptionService,
   IEncryptionService,
} from "@application/identity/services/EncryptionService";
import {
   IdentityService,
   IIdentityService,
} from "@application/identity/services/IdentityService";
import {
   IRegisterUserValidator,
   RegisterUserValidator,
} from "@application/identity/validators/RegisterUserValidator";
import {
   IUserRepo,
   UserRepository,
} from "@infrastructure/persistence/repositories/UserRepository";
import { Module } from "@nestjs/common";
import { IdentityController } from "@web/controllers/IdentityController";
import { DatabaseModule } from "./DatabaseModule";
import * as bcrypt from "bcrypt";

export const HASH_STRATEGY = Symbol.for("HASH_STRATEGY");

@Module({
   imports: [DatabaseModule],
   controllers: [IdentityController],
   providers: [
      {
         provide: HASH_STRATEGY,
         useValue: bcrypt,
      },
      {
         provide: IIdentityService,
         useClass: IdentityService,
      },
      {
         provide: IEncryptionService,
         useClass: EncryptionService,
      },
      {
         provide: IRegisterUserValidator,
         useClass: RegisterUserValidator,
      },
      {
         provide: IUserRepo,
         useClass: UserRepository,
      },
   ],
})
export class IdentityModule {}
