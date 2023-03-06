import {FC, memo, useCallback, useEffect} from "react";
import {RootNoteData} from "@/types/NoteData";
import {TreeView} from "@/components";
import {
  addNoteData, reloadNoteDataList, setSelectNoteData,
  useNoteDataArr,
  useSelectedNoteData
} from "@/components/admin/note/store";
import {useNoteId} from "@/utils/PathVariable";
import {findSelectedData} from "@/utils/NoteUtils";
import {NoteTreeItemLabel} from "@/components/admin/note/NoteTreeItemLabel";
import {ActionButtonGroup} from "@/components/admin/note/ActionButtonGroup";


export const NoteTree: FC = memo(() => {
  const dataArr = useNoteDataArr()

  const selectedData = useSelectedNoteData()
  const noteId = useNoteId();

  useEffect(() => {
    (async function () {
      await reloadNoteDataList()
      await setSelectNoteData(findSelectedData(dataArr, noteId)).then(null)
    })()
  }, [])

  const handlerAdd = useCallback(() => {
    addNoteData(RootNoteData)
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
