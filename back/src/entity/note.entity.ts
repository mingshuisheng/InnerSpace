import {Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity("tb_note")
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string

  @Column({default: 0})
  parentId: number

  @Column({default:""})
  treeId: string

  @CreateDateColumn()
  createDate: Date

  @UpdateDateColumn()
  updateDate: Date

  @DeleteDateColumn()
  deleteDate: Date
}
