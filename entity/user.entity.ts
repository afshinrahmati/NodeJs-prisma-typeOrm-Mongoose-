import { Entity, ObjectId, ObjectIdColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class User {
  @ObjectIdColumn()
  id!: ObjectId;

  @Column()
  firstName!: string;

  @Column()
  phoneNumber!: string;

  @Column()
  email!: string;
}
