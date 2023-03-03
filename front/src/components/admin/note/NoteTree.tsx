import {ComponentProps, FC, MouseEventHandler, useCallback, useId} from "react";
import {TreeItem, TreeView, useNoteManagerContext} from "@/components";
import {NoteData} from "@/types/NoteData";
import {MdDelete, MdAdd, MdEdit} from "react-icons/md"
import classNames from "classnames";

export interface NoteTreeProps {
  noteDataList: NoteData[]
}

export const NoteTree: FC<NoteTreeProps> = ({noteDataList}) => {

  const {onSelectionChange, onAdd} = useNoteManagerContext();

  const handlerAdd = useCallback(() => {
    onAdd(0)
  }, [onAdd])

  return (
    <div className="w-[250px] h-full overflow-auto">
      <div className="w-full p-2">
        <ModifyButtonGroup onAdd={handlerAdd} size="large"/>
      </div>
      <TreeView onSelectionChange={onSelectionChange}>
        {
          noteDataList.map(noteData => (
            <NoteTreeItem key={noteData.id} noteData={noteData}/>
          ))
        }
      </TreeView>
    </div>
  )
}

type NoteTreeItemProps = {
  noteData: NoteData
}

const NoteTreeItem: FC<NoteTreeItemProps> = ({noteData}) => {
  const {onAdd, onEdit, onDelete} = useNoteManagerContext();

  const handlerAdd = useCallback(() => {
    onAdd(noteData.id)
  }, [noteData.id, onAdd])

  const handlerEdit = useCallback(() => {
    onEdit(noteData.id)
  }, [noteData.id, onEdit])

  const handlerDelete = useCallback(() => {
    onDelete(noteData.id)
  }, [noteData.id, onDelete])

  return (
    <TreeItem key={noteData.id}
              label={<NoteTreeItemLabel onAdd={handlerAdd} onEdit={handlerEdit} onDelete={handlerDelete}
                                        noteData={noteData}/>} id={noteData.id}>
      {
        noteData.children?.length ?
          noteData.children.map(subNoteData => (
            <NoteTreeItem key={subNoteData.id} noteData={subNoteData}/>)) : undefined
      }
    </TreeItem>
  )
}

type NoteTreeItemLabelProps = {
  noteData: NoteData
  onAdd?(): void
  onEdit?(): void
  onDelete?(): void
}

const NoteTreeItemLabel: FC<NoteTreeItemLabelProps> = ({noteData, onAdd, onEdit, onDelete}) => {
  return (
    <div className="flex items-center gap-2">
      <div>{noteData.name}</div>
      <ModifyButtonGroup onAdd={onAdd} onEdit={onEdit} onDelete={onDelete}/>
    </div>
  )
}

type ModifyButtonGroupProps = {
  onAdd?(): void
  onEdit?(): void
  onDelete?(): void
  size?: "default" | "large"
}

const ModifyButtonGroup: FC<ModifyButtonGroupProps> = ({onAdd, onEdit, onDelete, size = "default"}) => {
  const icons: FC<ComponentProps<'svg'>>[] = []
  const clickFunArr: MouseEventHandler<HTMLDivElement>[] = []

  const handlerAdd = useCallback<MouseEventHandler<HTMLDivElement>>((event) => {
    event.stopPropagation()
    onAdd?.()
  }, [onAdd])

  if (onAdd) {
    icons.push(MdAdd)
    clickFunArr.push(handlerAdd)
  }

  const handlerEdit = useCallback<MouseEventHandler<HTMLDivElement>>((event) => {
    event.stopPropagation()
    onEdit?.()
  }, [onEdit])

  if (onEdit) {
    icons.push(MdEdit)
    clickFunArr.push(handlerEdit)
  }

  const handlerDelete = useCallback<MouseEventHandler<HTMLDivElement>>((event) => {
    event.stopPropagation()
    onDelete?.()
  }, [onDelete])

  if (onDelete) {
    icons.push(MdDelete)
    clickFunArr.push(handlerDelete)
  }

  let sizeClass = "w-5 h-5"
  let textClass = ""
  if (size === "large") {
    sizeClass = "w-10 h-10"
    textClass = "text-2xl"
  }
  return (
    <div className="flex text-gray-500">
      {
        icons.map((Icon, index) => (
          <div key={index} onClick={clickFunArr[index]}
               className={classNames("flex justify-center items-center rounded cursor-pointer hover:bg-blue-300 hover:text-blue-600 active:bg-blue-400 active:text-blue-700", sizeClass, textClass)}>
            <Icon/>
          </div>
        ))
      }
    </div>
  )
}
