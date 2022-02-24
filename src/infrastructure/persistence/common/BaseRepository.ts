import { Injectable } from "@nestjs/common";
import { DeepPartial } from "typeorm";
import { DbSet } from "../DbContext";
import { BaseEntity } from "./BaseEntity";

@Injectable()
export abstract class BaseRepository<
   TEntity extends BaseEntity<TId>,
   TId = number
> {
   protected _data: DbSet<TEntity, TId>;

   constructor(data: DbSet<TEntity, TId>) {
      this._data = data;
   }

   async save(entity: DeepPartial<TEntity>): Promise<TEntity> {
      return await this._data.save(entity, { reload: true });
   }

   async all() {
      return await this._data.find();
   }

   async findById(id: TId): Promise<TEntity | null> {
      return (await this._data.findOne(id)) ?? null;
   }

   async delete(id: TId): Promise<boolean> {
      await this._data.createQueryBuilder().delete().whereInIds(id).execute();

      return true;
   }
}
