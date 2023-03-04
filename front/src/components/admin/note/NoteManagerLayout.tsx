import {FC, PropsWithChildren} from "react";
import {NoteManagerContext} from "@/components/admin/note/NoteManagerContext";
import {NoteTree} from "@/components/admin/note/NoteTree";
import {Divider, Flex1Full} from "@/components";
import {NoteData} from "@/types/NoteData";

export interface NoteManagerLayout extends PropsWithChildren {
  noteDataList: NoteData[]

  onAdd: (parentId: number) => void
  onEdit: (id: number) => void
  onDelete: (id: number) => void
  onSelectionChange: (id: number) => void
}

export const NoteManagerLayout: FC<NoteManagerLayout> = ({
                                                           children,
                                                           noteDataList,
                                                           onAdd,
                                                           onEdit,
                                                           onDelete,
                                                           onSelectionChange
                                                         }) => {

  return (
    <NoteManagerContext.Provider value={{
      onSelectionChange,
      onAdd,
      onEdit,
      onDelete
    }}>
      <div className="flex w-full h-full">
        <NoteTree noteDataList={noteDataList}/>
        <Divider/>
        <Flex1Full>
          <div className="w-full h-full overflow-auto p-2 box-border">
            {children}
          </div>
        </Flex1Full>
      </div>
    </NoteManagerContext.Provider>
  )
}
