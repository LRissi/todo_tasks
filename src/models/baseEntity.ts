import { Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

export abstract class BaseEntity {
  @Column()
  @CreateDateColumn()
  created_at?: Date;

  @Column()
  @UpdateDateColumn()
  updated_at?: Date;
}
