import { Connection } from "typeorm";

export interface IDatabase {
   connection: Connection;
   connect(): Promise<void>;
   close(): Promise<void>;
}
