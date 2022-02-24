import { Inject, Injectable } from "@nestjs/common";
import { Connection, Repository } from "typeorm";
import { BaseEntity } from "./common/BaseEntity";
import { DB_CONNECTION } from "./common/DbConfigService";
import { TodoItem } from "./models/TodoItem";
import { User } from "./models/User";

export type DbSet<
   TEntity extends BaseEntity<TId>,
   TId = number
> = Repository<TEntity>;

export const IDbContext = Symbol.for("DbContext");

@Injectable()
export class DbContext {
   private readonly _users: DbSet<User, number>;
   private readonly _todoItems: DbSet<TodoItem, number>;

   constructor(@Inject(DB_CONNECTION) { manager }: Connection) {
      this._users = manager.getRepository(User);
      this._todoItems = manager.getRepository(TodoItem);
   }

   public get users(): DbSet<User> {
      return this._users;
   }

   public get todoItems(): DbSet<TodoItem> {
      return this._todoItems;
   }
}
