import { IDatabase } from "./IDatabase";
import { createConnection, ConnectionOptions, Connection } from "typeorm";
import { Injectable, OnApplicationShutdown } from "@nestjs/common";
import { DbConfigService } from "../common/DbConfigService";

export const Database = Symbol.for("IDatabase");

@Injectable()
export class PostgresDatabase implements IDatabase, OnApplicationShutdown {
   private _connection: Connection;
   private _connectionOptions: ConnectionOptions;

   constructor(private readonly configService: DbConfigService) {
      this._connectionOptions = configService.connectionOptions;
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

   async connect(): Promise<void> {
      try {
         console.log("Connecting to DB ...");
         this._connection = await createConnection(this._connectionOptions);

         console.log("Successfully connected to DB...");
      } catch (e) {
         console.log(
            "Error connecting to the database ...\n",
            (e as any).message
         );
      }
   }
}
