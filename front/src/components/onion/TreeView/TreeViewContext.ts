import {createContext, useContext} from "react";

export interface TreeViewContextType {
  selectedId: number
  expendedIds: number[]
  onChange(value: number): void
}

export const TreeViewContext = createContext<TreeViewContextType>({
  selectedId: -1,
  expendedIds: [],
  onChange: () => {}
})

export const useTreeViewContext = () => useContext(TreeViewContext)
