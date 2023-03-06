import {FC, memo, useCallback} from "react";
import {useAutoAnimate} from '@formkit/auto-animate/react'
import {TreeViewContext} from "./TreeViewContext";
import {TreeData, TreeItemLabelProps} from "./types";
import {TreeItem} from "./TreeItem";
import {TreeItemLabel} from "@/components/onion/TreeView/TreeItemLabel";

export interface TreeViewProps {
  selectedData?: TreeData

  dataArr: TreeData[]
  treeItemLabel?: FC<TreeItemLabelProps>

  onSelectionChange?(data: TreeData): void
}

export const TreeView: FC<TreeViewProps> = memo(({
                                                   selectedData,
                                                   dataArr,
                                                   onSelectionChange,
                                                   treeItemLabel = TreeItemLabel
                                                 }) => {
  const [parent] = useAutoAnimate()

  const handlerItemClick = useCallback((data: TreeData) => {
    onSelectionChange?.(data)
  }, [onSelectionChange])

  if (!selectedData) {
    selectedData = dataArr[0]
  }

  return (
    <TreeViewContext.Provider value={{selectedTreeData: selectedData, onItemClick: handlerItemClick, treeItemLabel}}>
      <div ref={parent} className="flex flex-col">
        {
          dataArr.map(data => (
            <TreeItem key={data.id} data={data}/>
          ))
        }
      </div>
      <div className="w-0 h-5"/>
    </TreeViewContext.Provider>
  )
})
