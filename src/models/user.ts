import crypto from "crypto";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseEntity } from "./baseEntity";
import { Todo } from "./todo";
import { UserRule } from "../enums/userRule";

@Entity()
export class User extends BaseEntity {
  constructor(user?: { email?: string; senha?: string }) {
    super();
    this.email = user?.email;
    this.senha = user?.senha;
  }

  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({
    type: "varchar",
  })
  email?: string;

  @Column({
    type: "varchar",
    select: false,
  })
  senha?: string;

  @OneToMany((type) => Todo, (todo) => todo.user)
  todos?: Todo[];

  @BeforeInsert()
  @BeforeUpdate()
  criptografarSenha(): void {
    if (!this.senha) {
      return;
    }
    const hash = crypto.createHash("sha256").update(this.senha).digest("hex");
    this.senha = hash;
  }

  @Column({
    type: "enum",
    enum: UserRule,
  })
  type?: UserRule;
}
