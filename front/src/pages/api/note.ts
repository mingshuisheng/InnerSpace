import {get} from "@/pages/api/utils";
import {NoteNode} from "@/types/NoteNode";


export const getNoteTree = () => {
  return get<NoteNode>("/note/tree")
}
