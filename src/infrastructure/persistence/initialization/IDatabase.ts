import { Connection } from "typeorm";

export interface IDatabase {
   connection: Connection;
   close(): Promise<void>;
}
