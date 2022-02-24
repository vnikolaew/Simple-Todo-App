import {
   CreateDateColumn,
   Entity,
   PrimaryGeneratedColumn,
   UpdateDateColumn,
} from "typeorm";

@Entity()
export abstract class BaseEntity<TId> {
   @PrimaryGeneratedColumn("increment")
   readonly id: TId;

   @CreateDateColumn({
      name: "createdOn",
      type: "timestamp",
   })
   readonly createdOn!: Date;

   @UpdateDateColumn({
      name: "lastModifiedOn",
      type: "timestamp",
   })
   lastModifiedOn!: Date;
}
