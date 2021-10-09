import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { StateTODO } from "../enums/stateTodo";
import { User } from "./user";

@Entity()
export class Todo extends BaseEntity {
  constructor(user: { titulo?: string; descricao?: string }) {
    super();
    this.titulo = user.titulo;
    this.descricao = user.descricao;
  }

  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({
    type: "varchar",
  })
  titulo?: string;

  @Column({
    type: "varchar",
  })
  descricao?: string;

  @Column({
    type: "date",
  })
  dataPrazo?: Date;

  @Column({
    type: "enum",
    enum: StateTODO,
  })
  estado?: StateTODO;

  @Column({
    type: "datetime",
    nullable: true,
  })
  dataFinalizacao?: Date;

  @ManyToOne((type) => User, (user) => user.todos)
  user?: User;
}
