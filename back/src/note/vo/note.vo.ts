import { Note } from '../../entity/note.entity'

export class NoteVo {

  constructor(id: number, parentId: number,name: string) {
    this.id = id
    this.parentId = parentId
    this.name = name
    this.children = []
  }

  id: number
  parentId: number
  name: string
  children?: NoteVo[]
  content: string
}

export function entityToVo(entity: Note): NoteVo {
  return new NoteVo(entity.id, entity.parentId, entity.name)
}
