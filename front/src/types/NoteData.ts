export type NoteData = {
  id: number
  name: string
  children?: NoteData[]
}

export const RootNoteData: NoteData = {
  id: 0,
  name: "笔记主页",
}

export const NullNoteData: NoteData = {
  id: -1,
  name: "笔记不存在",
}
