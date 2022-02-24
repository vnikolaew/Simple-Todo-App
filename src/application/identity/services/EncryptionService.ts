import { Injectable, OnModuleInit } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { HASH_STRATEGY } from "src/modules/IdentityModule";
import bcrypt from "bcrypt";

export interface IEncryptionService {
   hash(password: string): Promise<string> | string;
   compare(
      hashedPassword: string,
      actualPassword: string
   ): Promise<boolean> | boolean;
}

export const IEncryptionService = Symbol.for("IEncryptionService");

@Injectable()
export class EncryptionService implements IEncryptionService, OnModuleInit {
   private _strategy: any;
   constructor(private moduleRef: ModuleRef) {}

   onModuleInit() {
      this._strategy = this.moduleRef.get(HASH_STRATEGY);
   }

   async hash(password: string): Promise<string> {
      const salt = await this._strategy.genSalt(10, "a");

      return await this._strategy.hash(password, salt);
   }

   async compare(
      hashedPassword: string,
      actualPassword: string
   ): Promise<boolean> {
      return await this._strategy.compare(actualPassword, hashedPassword);
   }
}
