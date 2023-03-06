import {FC, memo} from "react";
import {NoteManagerLayout} from "@/components";
import {NoteTree} from "@/components/admin/note/NoteTree";
import {NoteContentEditor} from "@/components/admin/note/NoteContentEditor";
import {AddOrEditNoteLayer} from "@/components/admin/note/AddNoteLayer";
import {DeleteNoteLayer} from "@/components/admin/note/DeleteNoteLayer";
import {EditNoteLayer} from "@/components/admin/note/EditNoteLayer";

export const NoteManagerPage: FC = memo(() => {
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
