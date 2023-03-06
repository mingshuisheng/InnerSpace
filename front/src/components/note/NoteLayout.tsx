import {FC, PropsWithChildren, useCallback} from "react";
import {NavTree} from "@/components/note/NavTree";
import {NoteData, RootNoteData} from "@/types/NoteData";
import {useRouter} from "next/router";
import {Divider, Flex1Full} from "@/components";
import {findSelectedData} from "@/utils/NoteUtils";

export interface NoteLayoutProps extends PropsWithChildren {
  noteDataList: NoteData[]
}

export const NoteLayout: FC<NoteLayoutProps> = ({children, noteDataList}) => {
  const router = useRouter();
  const handlerTreeItemClick = useCallback((data: NoteData) => {
    router.push(`/note/${data.id}`).then(null)
  }, [])

  let selectedNoteData = RootNoteData

  if (router.query.noteId) {
    selectedNoteData = findSelectedData(noteDataList, parseInt(router.query.noteId as string))
  }

  return (
    <div className="flex gap-2 h-full">
      <NavTree selectedNoteData={selectedNoteData} noteDataList={noteDataList}
               onSelectionChange={handlerTreeItemClick}/>
      <Divider/>
      <Flex1Full>
        <div className="w-full h-full overflow-auto p-2 box-border">
          {children}
        </div>
      </Flex1Full>
    </div>
  )
}
