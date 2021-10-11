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
  constructor(todo?: { titulo?: string; descricao?: string }) {
    super();
    this.titulo = todo?.titulo;
    this.descricao = todo?.descricao;
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

  estaAtrasado?: boolean;
}
