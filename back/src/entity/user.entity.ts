import {Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity("tb_user")
export class User{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createDate: Date

  @UpdateDateColumn()
  updateDate: Date

  @DeleteDateColumn()
  deleteDate: Date
}
