import {Injectable, OnApplicationBootstrap} from '@nestjs/common';
import {CreateNoteDto} from './dto/create-note.dto';
import {UpdateNoteDto} from './dto/update-note.dto';
import {Note, NoteNotFound} from "../entity/note.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {entityToVo, NoteVo} from "./vo/note.vo";
import {v4 as uuidv4} from 'uuid';
import {FileUtil} from "../utils/file.util";
import {ConfigService} from "@nestjs/config";
import {getNoteConfig, NoteConfig} from "../config/note.config";

@Injectable()
export class NoteService implements OnApplicationBootstrap {

  private noteConfig: NoteConfig

  constructor(
    @InjectRepository(Note)
    private noteRepository: Repository<Note>,
    private configService: ConfigService,
  ) {
    this.noteConfig = getNoteConfig(this.configService)
  }

  async create(createNoteDto: CreateNoteDto) {
    let parentTreeId = ""

    if (createNoteDto.parentId) {
      const parentNote = await this.noteRepository.findOneBy({
        id: createNoteDto.parentId
      })
      if (parentNote)
        parentTreeId = parentNote.treeId
    }

    //生成uuid，并且去除中间的-
    const uuid = uuidv4().replace(/-/g, "");
    //生成note文件名
    const noteFileName = `${uuid}.md`;

    const note = this.noteRepository.create({
      name: createNoteDto.name,
      parentId: createNoteDto.parentId || null,
      noteFileName
    })

    //创建note文件
    await this.writeToNote(note, "")

    //根据id修改treeId
    const saveNote = await this.noteRepository.save(note)
    saveNote.treeId = parentTreeId ? parentTreeId + "-" + saveNote.id : saveNote.id.toString()
    await this.noteRepository.save(saveNote)

    return entityToVo(saveNote);
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
    //不允许删除根节点
    if (id === 0) {
      return NoteNotFound
    }
    const note = await this.noteRepository.findOneBy({id});
    return entityToVo(!note ? NoteNotFound : await this.noteRepository.remove(note))
  }

  async buildTree() {
    const notes = await this.noteRepository.find();
    const rootNoteVos = notes.map(note => entityToVo(note));
    const voMap = rootNoteVos.reduce((map, cur) => map.set(cur.id, cur), new Map<number, NoteVo>());
    rootNoteVos
      .filter(noteVo => voMap.has(noteVo.parentId))
      .forEach(noteVo => voMap.get(noteVo.parentId).children.push(noteVo))

    return rootNoteVos.filter(noteVo => !noteVo.parentId);
  }

  async changeContent(id: number, noteContent: string) {
    //根据id查询note
    let note = await this.noteRepository.findOneBy({id});
    if (!note) {
      return entityToVo(NoteNotFound)
    }
    await this.writeToNote(note, noteContent)
    return entityToVo(note);
  }

  async getContent(id: number) {
    //查询note
    const note = await this.noteRepository.findOneBy({id});
    if (!note) {
      return entityToVo(NoteNotFound)
    }

    //如果文件不存在，返回空字符串
    if (!await FileUtil.exists(this.fillNotePath(note.noteFileName))) {
      return entityToVo(note);
    }
    //读取文件并创建vo
    return entityToVo(note, await FileUtil.readFile(this.fillNotePath(note.noteFileName)));
  }

  private fillNotePath(noteFileName: string) {
    return `${this.noteConfig.savePath}/${noteFileName}`
  }

  private async writeToNote(note: Note, noteContent: string) {
    await FileUtil.writeFile(this.fillNotePath(note.noteFileName), noteContent)
  }

  async onApplicationBootstrap() {
    //判断是否需要创建笔记存放目录,如果不存在则创建
    if (!await FileUtil.exists(this.noteConfig.savePath)) {
      //创建笔记存放目录
      await FileUtil.mkdir(this.noteConfig.savePath)
    }

    //查询是否有根节点，如果没有则创建
    const note = await this.noteRepository.findOneBy({id: 1});
    if (!note) {
      const rootNote = this.noteRepository.create({
        id: 1,
        name: "笔记主页",
        noteFileName: this.noteConfig.rootNoteName,
        parentId: null,
        treeId: "0",
      });
      await this.writeToNote(rootNote, "# 笔记主页")
      await this.noteRepository.insert(rootNote)
    }
  }
}
