import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./baseEntity";
import { Todo } from "./todo";

@Entity()
export class User extends BaseEntity {
  constructor(user: { email?: string; senha?: string }) {
    super();
    this.email = user.email;
    this.senha = user.senha;
  }

  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({
    type: "varchar",
  })
  email?: string;

  @Column({
    type: "varchar",
  })
  senha?: string;

  @OneToMany((type) => Todo, (todo) => todo.user)
  todos?: Todo[];
}
