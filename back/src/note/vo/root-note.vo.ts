export class RootNoteVo {

  constructor(id: number, parentId: number,name: string) {
    this.id = id
    this.parentId = parentId
    this.name = name
    this.children = []
  }

  id: number
  parentId: number
  name: string
  children?: RootNoteVo[]
}
