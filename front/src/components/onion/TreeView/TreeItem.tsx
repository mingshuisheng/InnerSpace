import {Children, FC, PropsWithChildren, useCallback, useEffect, useState} from "react";
import {HiChevronDown, HiChevronRight} from "react-icons/hi";
import {useAutoAnimate} from '@formkit/auto-animate/react'
import classNames from "classnames";
import {useTreeViewContext} from "@/components/onion/TreeView/TreeViewContext";


export interface TreeItemProps extends PropsWithChildren {
  id: number
  label: string
}

export const TreeItem: FC<TreeItemProps> = ({children, id, label}) => {
  const [parent] = useAutoAnimate()
  const {selectedId, onChange, expendedIds} = useTreeViewContext();
  const [isOpen, setIsOpen] = useState(expendedIds.includes(id));

  const handleClick = useCallback(() => {
    if (id !== selectedId) {
      onChange(id)
    }
  }, [selectedId])

  const iconClass = "h-5 w-5"
  const onClass = 'bg-gray-100 text-blue-600 dark:bg-gray-800 dark:text-blue-500'
  const offClass = 'text-gray-500 hover:bg-gray-50 hover:text-gray-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300'
  return (
    <div ref={parent} className="flex flex-col">
      <div
        className={classNames("flex items-center text-lg font-medium first:ml-0 rounded hover:cursor-pointer w-max", {
          [onClass]: id === selectedId,
          [offClass]: id !== selectedId,
        })}
      >
        {
          !(Children.count(children) > 0) ? <div className={iconClass}/> :
            !isOpen ?
              <HiChevronRight onClick={() => setIsOpen(open => !open)} className={iconClass}/> :
              <HiChevronDown onClick={() => setIsOpen(open => !open)} className={iconClass}/>
        }
        <div title={label} onClick={handleClick} className="whitespace-nowrap">
          {label}
        </div>
      </div>
      {
        !isOpen ? "" :
          <div className="pl-4">
            {children}
          </div>
      }
    </div>
  )
}
