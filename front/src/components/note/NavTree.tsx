import {FC, memo, useCallback, useContext, useEffect, useMemo, useState} from "react";
import {NoteData} from "@/types/NoteData";
import {TreeItem, TreeView} from "@/components";

export interface NavTreeProps {
  noteDataList: NoteData[],
  selectedId: number
  expendedIds: number[]

  onSelectionChange(id: number): void
}

export const NavTree: FC<NavTreeProps> = ({noteDataList, selectedId, expendedIds, onSelectionChange}) => {
  const handleSelectionChange = useCallback((id: number) => {
    onSelectionChange?.(id)
  }, [noteDataList])


  return (
    <div className="w-[250px] overflow-auto">
      <TreeView expendedIds={expendedIds} onSelectionChange={handleSelectionChange} defaultSelectedId={selectedId}>
        {
          noteDataList.map(noteData => (<NavNote key={noteData.id} noteData={noteData}/>))
        }
      </TreeView>
    </div>
  )
}

type NavNoteProps = {
  noteData: NoteData,
}

const NavNote: FC<NavNoteProps> = ({noteData}) => {

  return (
    <TreeItem key={noteData.id}
              label={noteData.name} id={noteData.id}>
      {
        noteData.children?.length ?
          noteData.children.map(subNoteData => (
            <NavNote key={noteData.id} noteData={subNoteData}/>)) : undefined
      }
    </TreeItem>
  )
}
