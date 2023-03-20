import {FC} from "react";
import {NoteManagerPage} from "@/pageComponents/admin/note/NoteManagerPage";
import {useSelectedNoteData} from "@/pageComponents/admin/note/store";
import {RootNoteData} from "@/types/NoteData";
import {Head} from "@/pageComponents/common";
import {WithAuth} from "@/pageComponents/admin";

const NoteManager: FC = () => {
  const noteData = useSelectedNoteData();

  return (
    <Head pageTitle={noteData.id === RootNoteData.id ? RootNoteData.name : "笔记-" + noteData.name}>
        <NoteManagerPage/>
    </Head>
  )
}

export default WithAuth(NoteManager)
