export type NoteData = {
  id: number
  name: string
  children?: NoteData[]
}

export const RootNoteData: NoteData = {
  id: 0,
  name: "root",
}
