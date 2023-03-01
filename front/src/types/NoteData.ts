export type NoteData = {
  id: number
  name: string
  children?: NoteData[]
}
