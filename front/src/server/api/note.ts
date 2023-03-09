import {NoteData} from "@/types/NoteData";
import {BuildApiParams} from "@/utils/NetworkUtils";

export type NoteApiType = {
  getNoteTree: () => Promise<NoteData>
  addNote: (parentId: number, name: string) => Promise<NoteData>
  modifyNote: (id: number, name: string, parentId?: number) => Promise<NoteData>
  deleteNote: (id: number) => Promise<NoteData>
  getNoteContent: (id: number) => Promise<NoteData & { content: string }>
  modifyNoteContent: (id: number, noteDetail: string) => Promise<NoteData>
}

export const NoteApi: BuildApiParams<NoteApiType> = {
  getNoteTree: fetra => () => fetra.get<NoteData>("/note/tree"),
  addNote: fetra => (parentId, name) => fetra.post<NoteData>("/note", {parentId, name}),
  modifyNote: fetra => (id, name, parentId) => fetra.patch<NoteData>(`/note/${id}`, {name, parentId}),
  deleteNote: fetra => id => fetra.delete<NoteData>(`/note/${id}`),
  getNoteContent: fetra => id => fetra.get<NoteData & { content: string }>(`/note/content/${id}`),
  modifyNoteContent: fetra => (id, noteContent) => fetra.patch<NoteData>(`/note/content/${id}`, {noteContent})
}

