import {TreeItemLabelComponent} from "@/components";
import {memo, useCallback} from "react";
import {addNoteData, deleteNoteData, editNoteData} from "./store";
import {ActionButtonGroup} from "./ActionButtonGroup";
import {RootNoteData} from "@/types/NoteData";

export const NoteTreeItemLabel: TreeItemLabelComponent = memo(({data}) => {
  const handlerAdd = useCallback(() => addNoteData(data), [data])
  const handlerEdit = useCallback(() => editNoteData(data), [data])
  const handlerDelete = useCallback(() => deleteNoteData(data), [data])

  return (
    <div className="flex items-center gap-2">
      <div>{data.name}</div>
      <ActionButtonGroup onAdd={handlerAdd} onEdit={handlerEdit}
                         onDelete={data.id === RootNoteData.id ? undefined : handlerDelete}/>
    </div>
  )
})

NoteTreeItemLabel.displayName = "NoteTreeItemLabel"
