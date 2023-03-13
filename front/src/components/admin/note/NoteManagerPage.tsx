import {FC, memo, useEffect} from "react";
import {NoteManagerLayout} from "@/components";
import {NoteTree} from "@/components/admin/note/NoteTree";
import {NoteContentEditor} from "@/components/admin/note/NoteContentEditor";
import {AddOrEditNoteLayer} from "@/components/admin/note/AddNoteLayer";
import {DeleteNoteLayer} from "@/components/admin/note/DeleteNoteLayer";
import {EditNoteLayer} from "@/components/admin/note/EditNoteLayer";
import {reloadNoteDataList} from "@/components/admin/note/store";

export const NoteManagerPage: FC = memo(() => {
  useEffect(() => {
    reloadNoteDataList().then()
  }, [])
  return (
    <>
      <NoteManagerLayout aside={<NoteTree/>}>
        <NoteContentEditor/>
      </NoteManagerLayout>
      <AddOrEditNoteLayer/>
      <DeleteNoteLayer/>
      <EditNoteLayer/>
    </>
  )
})
