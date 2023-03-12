import {FC, useCallback, useState} from "react";
import {HiChevronDown, HiChevronRight} from "react-icons/hi";
import {useAutoAnimate} from '@formkit/auto-animate/react'
import classNames from "classnames";
import {useTreeViewContext} from "@/components/onion/TreeView/TreeViewContext";
import {TreeData} from "@/components/onion/TreeView/types";


export interface TreeItemProps {
  data: TreeData
}

export const TreeItem: FC<TreeItemProps> = ({data}) => {
  const [parent] = useAutoAnimate()
  const {selectedTreeData, onItemClick, treeItemLabel: Label} = useTreeViewContext();
  const id = data.id
  const selectedId = selectedTreeData.id
  const [isOpen, setIsOpen] = useState(() => needExpend(data, selectedTreeData));

  const handleClick = useCallback(() => {
    if (data !== selectedTreeData) {
      onItemClick(data)
    }
  }, [data, selectedTreeData, onItemClick])

  const hasChildren = !!data.children?.length

  const onClass = 'bg-gray-100 text-blue-600 dark:bg-gray-800 dark:text-blue-500'
  const offClass = 'text-gray-500 hover:bg-gray-50 hover:text-gray-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300'
  const handleIconClick = useCallback(() => hasChildren && setIsOpen(open => !open), [hasChildren, setIsOpen]);
  return (
    <div ref={parent} className="flex flex-col">
      <div
        className={classNames("flex items-center text-lg font-medium first:ml-0 rounded w-max", {
          [onClass]: id === selectedId,
          [offClass]: id !== selectedId,
        })}
      >
        <div onClick={handleIconClick}
             className={classNames("h-5 w-5", {"invisible": !hasChildren, ["hover:cursor-pointer"]: hasChildren})}>
          {!isOpen ? <HiChevronRight/> : <HiChevronDown/>}
        </div>
        <div onClick={handleClick} className={classNames("whitespace-nowrap box-border", {
          ["pr-5"]: !hasChildren,
          ["pr-2"]: hasChildren,
          ["hover:cursor-pointer"]: id !== selectedId
        })}>
          <Label data={data}/>
        </div>
      </div>
      {
        !isOpen || !hasChildren ? "" :
          <div className="pl-4">
            {
              data.children?.map(child => (
                <TreeItem key={child.id} data={child}/>
              ))
            }
          </div>
      }
    </div>
  )
}

const needExpend = (data: TreeData, selectedData: TreeData): boolean => {
  if (data === selectedData) {
    return false
  }
  if (data.children) {
    return data.children.some(child => needExpend(child, selectedData))
  }
  return false
}
