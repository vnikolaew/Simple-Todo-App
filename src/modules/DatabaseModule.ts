import {
   DbConfigService,
   DB_CONNECTION,
} from "@infrastructure/persistence/common/DbConfigService";
import { DbContext, IDbContext } from "@infrastructure/persistence/DbContext";
import {
   Database,
   PostgresDatabase,
} from "@infrastructure/persistence/initialization/PostgresDatabase";
import {
   ITodoItemRepo,
   TodoItemRepository,
} from "@infrastructure/persistence/repositories/TodoItemRepository";
import {
   IUserRepo,
   UserRepository,
} from "@infrastructure/persistence/repositories/UserRepository";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { createConnection } from "typeorm";

@Module({
   imports: [ConfigModule],
   providers: [
      ConfigService,
      DbConfigService,
      {
         provide: Database,
         useClass: PostgresDatabase,
      },
      {
         provide: IDbContext,
         useClass: DbContext,
      },
      {
         provide: DB_CONNECTION,
         useFactory: async ({ connectionOptions }: DbConfigService) => {
            return await createConnection(connectionOptions);
         },
         inject: [DbConfigService],
      },
      { provide: IUserRepo, useClass: UserRepository },
      { provide: ITodoItemRepo, useClass: TodoItemRepository },
   ],
   exports: [IDbContext, IUserRepo, ITodoItemRepo, DB_CONNECTION],
})
export class DatabaseModule {}
