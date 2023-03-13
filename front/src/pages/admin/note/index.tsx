import {FC} from "react";
import {NoteManagerPage} from "@/components/admin/note/NoteManagerPage";
import {useSelectedNoteData} from "@/components/admin/note/store";
import {Head, WithAuth} from "@/components";
import {RootNoteData} from "@/types/NoteData";

const NoteManager: FC = () => {
  const noteData = useSelectedNoteData();

  return (
    <Head pageTitle={noteData.id === RootNoteData.id ? RootNoteData.name : "笔记-" + noteData.name}>
        <NoteManagerPage/>
    </Head>
  )
}

export default WithAuth(NoteManager)
