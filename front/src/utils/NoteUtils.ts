import {NoteData, RootNoteData} from "@/types/NoteData";

export const findSelectedData = (dataArr: NoteData[], noteId: number): NoteData => {
  if (dataArr.length === 0) {
    return RootNoteData
  }

  for (const data of dataArr) {
    if (data.id === noteId) {
      return data
    }
  }

  for (const data of dataArr) {
    if (data.children?.length) {
      const selectedData = findSelectedData(data.children, noteId)
      if (selectedData !== RootNoteData) {
        return selectedData
      }
    }
  }

  return RootNoteData
}
