import {get} from "./utils";
import {NoteData} from "@/types/NoteData";


export const getNoteTree = () => {
  return get<NoteData>("/note/tree")
}
