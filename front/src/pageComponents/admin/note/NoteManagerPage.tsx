import {FC, memo, useEffect} from "react";
import {NoteTree} from "./NoteTree";
import {NoteContentEditor} from "./NoteContentEditor";
import {AddNoteLayer} from "./AddNoteLayer";
import {DeleteNoteLayer} from "./DeleteNoteLayer";
import {EditNoteLayer} from "./EditNoteLayer";
import {reloadNoteDataList} from "./store";
import {NoteManagerLayout} from "./NoteManagerLayout";

export const NoteManagerPage: FC = memo(() => {
  useEffect(() => {
    reloadNoteDataList().then()
  }, [])
  return (
    <>
      <NoteManagerLayout aside={<NoteTree/>}>
        <NoteContentEditor/>
      </NoteManagerLayout>
      <AddNoteLayer/>
      <DeleteNoteLayer/>
      <EditNoteLayer/>
    </>
  )
})

NoteManagerPage.displayName = "NoteManagerPage"
