import {createContext, FC, useContext} from "react";
import {TreeData, TreeItemLabelProps} from "@/components/onion/TreeView/types";
import {TreeItemLabel} from "@/components/onion/TreeView/TreeItemLabel";

export interface TreeViewContextType {
  selectedTreeData: TreeData
  treeItemLabel: FC<TreeItemLabelProps>
  onItemClick: (data: TreeData) => void
}

export const TreeViewContext = createContext<TreeViewContextType>({
  selectedTreeData: {id: 0, name: ""},
  treeItemLabel: TreeItemLabel,
  onItemClick: () => {}
})

export const useTreeViewContext = () => useContext(TreeViewContext)
