import {Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity("tb_image")
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default: "", type: "varchar", length: "100"})
  fileName: string

  @Column({default: "", type: "varchar", length: "100"})
  originalName: string

  @CreateDateColumn()
  createDate: Date

  @UpdateDateColumn()
  updateDate: Date

  @DeleteDateColumn()
  deleteDate: Date
}
