import {FC, PropsWithChildren, useCallback, useState} from "react";
import {useAutoAnimate} from '@formkit/auto-animate/react'
import {TreeViewContext} from "@/components/onion/TreeView/TreeViewContext";

export interface TreeViewProps extends PropsWithChildren {
  defaultSelectedId: number
  expendedIds: number[]

  onSelectionChange?(id: number): void
}

export const TreeView: FC<TreeViewProps> = ({children, defaultSelectedId, expendedIds, onSelectionChange}) => {
  const [parent] = useAutoAnimate()

  const [selectedId, setSelectedId] = useState(defaultSelectedId)

  const handlerChange = useCallback((nextId: number) => {
    setSelectedId(nextId)
    onSelectionChange?.(nextId)
  }, [])

  return (
    <TreeViewContext.Provider value={{selectedId, expendedIds, onChange: handlerChange}}>
      <div ref={parent} className="flex flex-col">
        {children}
      </div>
      <div className="w-0 h-5" />
    </TreeViewContext.Provider>
  )
}
