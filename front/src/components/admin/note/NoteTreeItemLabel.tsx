import {TreeItemLabelComponent} from "@/components";
import {memo, useCallback} from "react";
import {addNoteData, deleteNoteData, editNoteData} from "@/components/admin/note/store";
import {ActionButtonGroup} from "@/components/admin/note/ActionButtonGroup";

export const NoteTreeItemLabel: TreeItemLabelComponent = memo(({data}) => {
  const handlerAdd = useCallback(() => addNoteData(data), [data])
  const handlerEdit = useCallback(() => editNoteData(data), [data])
  const handlerDelete = useCallback(() => deleteNoteData(data), [data])

  return (
    <div className="flex items-center gap-2">
      <div>{data.name}</div>
      {
        data.id !== 0 && <ActionButtonGroup onAdd={handlerAdd} onEdit={handlerEdit} onDelete={handlerDelete}/>
      }
    </div>
  )
})
