import { Inject, Injectable, OnApplicationShutdown } from "@nestjs/common";
import { Connection } from "typeorm";
import { DB_CONNECTION } from "../common/DbConfigService";
import { IDatabase } from "./IDatabase";

export const Database = Symbol.for("IDatabase");

@Injectable()
export class PostgresDatabase implements IDatabase, OnApplicationShutdown {
   private _connection: Connection;

   constructor(@Inject(DB_CONNECTION) connection: Connection) {
      this._connection = connection;
   }

   async onApplicationShutdown(signal?: string) {
      await this.close();
   }

   public get connection(): Connection {
      return this._connection;
   }

   public async close(): Promise<void> {
      await this._connection?.close();
   }
}
