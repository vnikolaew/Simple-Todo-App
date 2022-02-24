import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ModuleRef } from "@nestjs/core";
import { ConnectionOptions } from "typeorm";
import { TodoItem } from "../models/TodoItem";
import { User } from "../models/User";

export const DB_CONNECTION = Symbol.for("DB_CONNECTION");

@Injectable()
export class DbConfigService {
   private static readonly DB_NAME = "postgres";
   constructor(private moduleRef: ModuleRef) {}

   public get connectionOptions(): ConnectionOptions {
      const configService = this.moduleRef.get(ConfigService);

      return {
         type: DbConfigService.DB_NAME,
         host: configService.get("DB_HOST"),
         username: configService.get("DB_USER"),
         password: configService.get("DB_PASS"),
         port: Number(configService.get("DB_PORT")),
         entities: [TodoItem, User],
         database: configService.get("DB_SCHEMA"),
         synchronize: true,
         logging: false,
      };
   }
}
