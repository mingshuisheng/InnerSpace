import {Injectable} from '@nestjs/common';
import {CreateNoteDto} from './dto/create-note.dto';
import {UpdateNoteDto} from './dto/update-note.dto';
import {Note, NoteNotFound} from "../entity/note.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {entityToVo, NoteVo} from "./vo/note.vo";
import {v4 as uuidv4} from 'uuid';
// import fs from "fs";
// import util from "util"

const fs = require('fs');
const util = require('util');


@Injectable()
export class NoteService {

  constructor(
    @InjectRepository(Note)
    private noteRepository: Repository<Note>,
  ) {
  }


  async create(createNoteDto: CreateNoteDto) {
    let parentTreeId = "0"

    if (createNoteDto.parentId) {
      const parentNote = await this.noteRepository.findOneBy({
        id: createNoteDto.parentId
      })
      if (parentNote)
        parentTreeId = parentNote.treeId
    }

    const note = this.noteRepository.create({
      name: createNoteDto.name,
      parentId: createNoteDto.parentId || 0,
    })

    const saveNote = await this.noteRepository.save(note)

    saveNote.treeId = parentTreeId + "-" + saveNote.id

    await this.noteRepository.save(saveNote)

    return entityToVo(saveNote);
  }

  findAll(): Note[] {
    return [];
  }

  async findOne(id: number) {
    return entityToVo(await this.noteRepository.findOneBy({id}));
  }

  async update(id: number, updateNoteDto: UpdateNoteDto) {
    const note = await this.noteRepository.findOneBy({id});

    if (!note) {
      return NoteNotFound
    }

    note.name = updateNoteDto.name;
    if (updateNoteDto.parentId && note.parentId !== updateNoteDto.parentId) {
      const parentNote = await this.noteRepository.findOneBy({
        id: updateNoteDto.parentId
      })
      if (parentNote) {
        note.parentId = parentNote.id
        note.treeId = parentNote.treeId + "-" + note.id
      }
    }

    return entityToVo(await this.noteRepository.save(note));
  }

  async remove(id: number) {
    const note = await this.noteRepository.findOneBy({id});
    if (!note) {
      return entityToVo(NoteNotFound)
    }
    return entityToVo(await this.noteRepository.remove(note))
  }

  async buildTree() {
    const root = new NoteVo(0, 0, "root")

    const notes = await this.noteRepository.find();

    const rootNoteVos = notes.map(note => new NoteVo(note.id, note.parentId, note.name));
    const voMap = rootNoteVos.reduce((map, cur) => map.set(cur.id, cur), new Map<number, NoteVo>());
    voMap.set(root.id, root)
    rootNoteVos
      .filter(noteVo => voMap.has(noteVo.parentId))
      .forEach(noteVo => voMap.get(noteVo.parentId).children.push(noteVo))
    return root;
  }

  async changeDetail(id: number, noteDetail: string) {

    //根据id查询note
    const note = await this.noteRepository.findOneBy({id});
    if (!note) {
      return entityToVo(NoteNotFound)
    }

    //文件夹名称
    const dirName = "./note";
    const mkdir = util.promisify(fs.mkdir);

    //检查文件夹是否存在，不存在则创建,用await
    if (!fs.existsSync(dirName)) {
      await mkdir(dirName);
    }
    let fileName = note.noteDetail
    if (fileName === "") {
      //生成uuid，并且去除中间的-
      const uuid = uuidv4().replace(/-/g, "");
      //创建markdown文件名，包含路径
      fileName = `${dirName}/${uuid}.md`;
    }


    //创建文件
    const writeFile = util.promisify(fs.writeFile);
    await writeFile(fileName, noteDetail, {encoding: "utf-8"});

    //修改note，并存入数据库
    note.noteDetail = fileName;

    return entityToVo(await this.noteRepository.save(note));
  }

  async getDetail(id: number) {
    //查询note
    const note = await this.noteRepository.findOneBy({id});
    if (!note) {
      return entityToVo(NoteNotFound)
    }

    //读取文件
    const readFile = util.promisify(fs.readFile);
    const data = await readFile(note.noteDetail, {encoding: "utf-8"});

    //创建vo
    const noteVo = entityToVo(note);
    noteVo.detail = data;
    return noteVo;
  }
}
