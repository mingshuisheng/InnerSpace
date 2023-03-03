import {Injectable} from '@nestjs/common';
import {CreateNoteDto} from './dto/create-note.dto';
import {UpdateNoteDto} from './dto/update-note.dto';
import {Note, NoteNotFound} from "../entity/note.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {RootNoteVo} from "./vo/root-note.vo";

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

    return saveNote;
  }

  findAll(): Note[] {
    return [];
  }

  findOne(id: number) {
    return `This action returns a #${id} note`;
  }

  async update(id: number, updateNoteDto: UpdateNoteDto) {
    const note = await this.noteRepository.findOneBy({id});

    if (!note){
      return NoteNotFound
    }

    note.name = updateNoteDto.name;
    if (updateNoteDto.parentId && note.parentId !== updateNoteDto.parentId) {
      const parentNote = await this.noteRepository.findOneBy({
        id: updateNoteDto.parentId
      })
      if (parentNote){
        note.parentId = parentNote.id
        note.treeId = parentNote.treeId + "-" + note.id
      }
    }

    return this.noteRepository.save(note);
  }

  async remove(id: number) {
    const note = await this.noteRepository.findOneBy({id});
    if(!note){
      return NoteNotFound
    }
    return await this.noteRepository.remove(note)
  }

  async buildTree() {
    const root = new RootNoteVo(0, 0,"root")

    const notes = await this.noteRepository.find();

    const rootNoteVos = notes.map(note => new RootNoteVo(note.id, note.parentId,note.name));
    const voMap = rootNoteVos.reduce((map, cur) => map.set(cur.id, cur), new Map<number, RootNoteVo>());
    voMap.set(root.id, root)
    rootNoteVos
      .filter(noteVo => voMap.has(noteVo.parentId))
      .forEach(noteVo => voMap.get(noteVo.parentId).children.push(noteVo))
    return root;
  }
}
