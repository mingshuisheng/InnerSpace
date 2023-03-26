import {FC, memo, useState} from "react";
import classNames from "classnames";
import {DrawerPanelProps} from "@/components/fromFlowbite/types/DrawerPanelProps";
import {useMemoizedFn, useUpdateEffect} from "ahooks";

export const DrawerPanel: FC<DrawerPanelProps> = memo(({children, open, onClose, position = "left"}) => {
  const [hidden, setHidden] = useState(!open)
  const [show, setShow] = useState(open)
  const onTransitionEnd = useMemoizedFn(() => !show && setHidden(true))
  const onDropBackClick = useMemoizedFn(() => onClose?.())

  useUpdateEffect(() => {
    if (open) {
      setHidden(false)
      setTimeout(() => {
        setShow(true)
      }, 10)
    } else {
      setShow(false)
    }
  }, [open])

  const onContentClick = useMemoizedFn(e => e.stopPropagation())

  return (
    <div onTransitionEnd={onTransitionEnd} onClick={onDropBackClick}
         className={classNames("fixed bg-gray-900 inset-0 z-[50] bg-opacity-50 dark:bg-opacity-80 transition-colors duration-100", {
           'bg-opacity-0': !show,
           'hidden': hidden
         })}>
      <div onClick={onContentClick}
           className={classNames("fixed z-[52] transition-all duration-100 overflow-auto bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400", {
             'left-0 h-full w-max': position === "left",
             'right-0 h-full w-max': position === "right",
             'top-0 w-full h-max': position === "top",
             'bottom-0 w-full h-max': position === "bottom",
             '-translate-x-full': position === "left" && !show,
             'translate-x-full': position === "right" && !show,
             '-translate-y-full': position === "top" && !show,
             'translate-y-full': position === "bottom" && !show,
           })}>
        {children}
      </div>
    </div>
  )
})

DrawerPanel.displayName = "DrawerPanel"
