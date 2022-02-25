import { DbContext, IDbContext } from "../DbContext";
import { User } from "../models/User";
import { BaseRepository } from "../common/BaseRepository";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export abstract class IUserRepository extends BaseRepository<User> {
   abstract findByEmail(email: User["email"]): Promise<User | null>;
}

export const IUserRepo = Symbol.for("IUserRepo");

@Injectable()
export class UserRepository extends IUserRepository {
   constructor(@Inject(IDbContext) { users }: DbContext) {
      super(users);
   }

   public async findByEmail(email: User["email"]): Promise<User | null> {
      return (
         (await this._data.findOne({
            where: { email },
            relations: ["todoItems"],
         })) ?? null
      );
   }
}
