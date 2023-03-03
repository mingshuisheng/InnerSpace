import {NoteData} from "@/types/NoteData";

export const flatNoteData = (...noteDataArr: NoteData[]) => {
  let result: NoteData[] = noteDataArr

  for (let i = 0; i < noteDataArr.length; i++) {
    if(noteDataArr[i].children?.length){
      result = result.concat(flatNoteData(...noteDataArr[i].children!))
    }
  }

  return result
}
