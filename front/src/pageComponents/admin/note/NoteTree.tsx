import {FC, memo, useCallback} from "react";
import {NullNoteData} from "@/types/NoteData";
import {TreeView} from "@/components";
import {
  addNoteData, setSelectNoteData,
  useNoteDataArr,
  useSelectedNoteData
} from "./store";
import {NoteTreeItemLabel} from "./NoteTreeItemLabel";
import {ActionButtonGroup} from "./ActionButtonGroup";


export const NoteTree: FC = memo(() => {
  const dataArr = useNoteDataArr()

  const selectedData = useSelectedNoteData()

  const handlerAdd = useCallback(() => {
    addNoteData(NullNoteData)
  }, [])

  return (
    <div className="w-[250px] h-full overflow-auto">
      <div className="w-full p-2">
        <ActionButtonGroup onAdd={handlerAdd} size="large"/>
      </div>
      <TreeView dataArr={dataArr} selectedData={selectedData} onSelectionChange={setSelectNoteData}
                treeItemLabel={NoteTreeItemLabel}/>
    </div>
  )
})

NoteTree.displayName = "NoteTree"
