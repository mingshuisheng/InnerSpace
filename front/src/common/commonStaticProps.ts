import {getNoteTree} from "@/server/api";
import {NoteData} from "@/types/NoteData";

export const getNoteNavData = async () => {
  const noteTree = await getNoteTree();
  let noteDataList: NoteData[] = []
  if (noteTree?.children) {
    noteDataList = noteTree.children
  }
  return [{id: 0, name: "笔记主页"},...noteDataList]
}
