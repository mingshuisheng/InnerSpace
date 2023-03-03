import {createContext, useContext} from "react";
import {NoteData} from "@/types/NoteData";

export interface NoteManagerContextType {
  onSelectionChange: (id: number) => void

  onAdd: (parentId: number) => void

  onEdit: (id: number) => void

  onDelete: (id: number) => void
}

export const NoteManagerContext = createContext<NoteManagerContextType>({
  onSelectionChange: () =>{},
  onAdd: () => {},
  onEdit: () => {},
  onDelete: () => {},
})

export const useNoteManagerContext = () => useContext(NoteManagerContext)
