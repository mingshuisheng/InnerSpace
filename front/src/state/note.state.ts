'use client'

import {useEffect, useState} from "react";
import {NoteNode} from "@/types/NoteNode";
import {getNoteTree} from "@/pages/api";

export function useNoteTree() {
  const [noteData, setNoteData] = useState<NoteNode>({id: 0, name: "root", children: []});

  const load = async () => {
    const treeRoot = await getNoteTree();
    setNoteData(treeRoot)
  }

  useEffect(() => {
    load().then()
  }, [])

  return {
    noteData,
    reload: load
  }
}
