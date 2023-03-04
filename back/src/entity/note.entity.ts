import {Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity("tb_note")
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string

  @Column({default: 0})
  parentId: number

  @Column({default:"", type: "varchar", length: "100"})
  treeId: string

  @Column({default:"", type: "varchar", length: "100"})
  noteDetail: string

  @CreateDateColumn()
  createDate: Date

  @UpdateDateColumn()
  updateDate: Date

  @DeleteDateColumn()
  deleteDate: Date
}

export const NoteNotFound = new Note()

NoteNotFound.id = -1
NoteNotFound.name = "未找到"
