import {FC, PropsWithChildren, useCallback} from "react";
import {NavTree} from "@/components/note/NavTree";
import {NoteData} from "@/types/NoteData";
import {useRouter} from "next/router";

export interface NoteLayoutProps extends PropsWithChildren {
  noteDataList: NoteData[]
}

export const NoteLayout: FC<NoteLayoutProps> = ({children, noteDataList}) => {
  const router = useRouter();
  const handlerTreeItemClick = useCallback((id: number) => {
    const url = id === 0 ? "/note" : `/note/${id}`
    router.push(url).then(null)
  }, [])

  let selectedId = 0
  let expendedIds: number[] = []

  if (router.query.noteId) {
    selectedId = parseInt(router.query.noteId as string)
    getExpendedIds(noteDataList, selectedId, expendedIds)
  }

  return (
    <div className="flex p-2 gap-2 h-full">
      <NavTree expendedIds={expendedIds} selectedId={selectedId} noteDataList={noteDataList}
               onSelectionChange={handlerTreeItemClick}/>
      <div className="h-full w-0.5 bg-gray-400 rounded-sm"/>
      <div className="flex-1">
        {children}
      </div>
    </div>
  )
}

function getExpendedIds(noteDataList: NoteData[], selectedId: number, expendedIds: number[]): boolean {
  if(noteDataList.length <= 0){
    return false
  }
  if(noteDataList.find(item => item.id == selectedId)){
    return true
  }

  for (let i = 0; i < noteDataList.length; i++) {
    if(noteDataList[i].children?.length && getExpendedIds(noteDataList[i].children || [], selectedId, expendedIds)){
      expendedIds.push(noteDataList[i].id)
      return true
    }
  }

  return false
}
