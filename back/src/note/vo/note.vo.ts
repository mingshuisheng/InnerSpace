import { Note } from '../../entity/note.entity'

export type NoteVo = {
  id: number
  parentId: number
  name: string
  children?: NoteVo[]
  content: string
}

export function entityToVo(entity: Note, content: string = "无数据"): NoteVo {
  return {
    id: entity.id,
    parentId: entity.parentId,
    name: entity.name,
    children: [],
    content: content
  }
}
