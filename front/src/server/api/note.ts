import {del, get, patch, post} from "./utils";
import {NoteData} from "@/types/NoteData";


export const getNoteTree = () => {
  return get<NoteData>("/note/tree")
}

export const addNote = (parentId: number, name: string) => {
  return post<NoteData>("/note", {
    parentId,
    name
  })
}

export const modifyNote = (id: number, name: string, parentId?: number) => {
  return patch<NoteData>(`/note/${id}`, {
    name,
    parentId
  })
}

export const deleteNote = (id: number) => {
  return del<NoteData>(`/note/${id}`)
}

export const getNoteDetail = (id: number) => {
  return get<NoteData & {detail: string}>(`/note/detail/${id}`)
}

export const modifyNoteDetail = (id: number, noteDetail: string) => {
  return patch<NoteData>(`/note/detail/${id}`, {
    noteDetail
  })
}
