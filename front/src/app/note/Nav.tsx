'use client'

import {Box, Button} from "@mui/material";
import {useRouter} from "next/navigation";
import {NoteTree} from "@/components/NoteTree";
import {useNoteTree} from "@/state/note.state";
import {useCallback} from "react";

type Props = {}

export function Nav({}: Props) {
  const router = useRouter();
  const {noteData, reload} = useNoteTree();

  const handleItemClick = useCallback(note => router.push(`/note/${note.id}`), [])

  return (
    <Box sx={{width: '100%', maxWidth: 300, bgcolor: 'background.paper'}}
         className="h-full box-border overflow-y-auto">
      <Button onClick={reload}>添加</Button>
      <nav aria-label="note navigation">
        <NoteTree onItemClick={handleItemClick}
                  noteNodes={noteData.children || []}/>
      </nav>
    </Box>
  )
}
