import {FC} from "react";
import {NoteManagerPage} from "@/components/admin/note/NoteManagerPage";
import {useSelectedNoteData} from "@/components/admin/note/store";
import {Head, WithAuth} from "@/components";

const NoteManager: FC = () => {
  const noteData = useSelectedNoteData();

  return (
    <Head pageTitle={noteData.id === 0 ? "笔记管理页面" : "笔记-" + noteData.name}>
        <NoteManagerPage/>
    </Head>
  )
}

export default WithAuth(NoteManager)
