import {FC, memo, useCallback} from "react";
import {NoteData} from "@/types/NoteData";
import {TreeView} from "@/components";

export interface NavTreeProps {
  noteDataList: NoteData[],
  selectedNoteData: NoteData
  onSelectionChange(data: NoteData): void
}

export const NavTree: FC<NavTreeProps> = memo(({noteDataList, selectedNoteData, onSelectionChange}) => {
  const handleSelectionChange = useCallback((data: NoteData) => {
    onSelectionChange?.(data)
  }, [onSelectionChange])

  return (
    <div className="w-[250px] overflow-auto">
      <TreeView selectedData={selectedNoteData} onSelectionChange={handleSelectionChange} dataArr={noteDataList}/>
    </div>
  )
})

NavTree.displayName = "NavTree"
