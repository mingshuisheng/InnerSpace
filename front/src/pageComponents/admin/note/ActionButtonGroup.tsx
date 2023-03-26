import {ComponentProps, FC, memo, MouseEventHandler, useCallback} from "react";
import {MdAdd, MdDelete, MdEdit} from "react-icons/md";
import classNames from "classnames";

type ActionButtonGroupProps = {
  onAdd?(): void
  onEdit?(): void
  onDelete?(): void
  size?: "default" | "large"
}

type ClickHandler = MouseEventHandler<HTMLDivElement>
type SvgIcon = FC<ComponentProps<'svg'>>

export const ActionButtonGroup: FC<ActionButtonGroupProps> = memo(({onAdd, onEdit, onDelete, size = "default"}) => {
  const icons: SvgIcon[] = []
  const clickFunArr: ClickHandler[] = []

  const fillArr = (icon: SvgIcon, handler: ClickHandler) => {
    icons.push(icon)
    clickFunArr.push(handler)
  }

  const handlerAdd = useClickFun(onAdd)
  !!onAdd && fillArr(MdAdd, handlerAdd)

  const handlerEdit = useClickFun(onEdit)
  !!onEdit && fillArr(MdEdit, handlerEdit)

  const handlerDelete = useClickFun(onDelete)
  !!onDelete && fillArr(MdDelete, handlerDelete)

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
})

ActionButtonGroup.displayName = "ActionButtonGroup"

const useClickFun = (fun?: () => void) => {
  return useCallback<ClickHandler>((event) => {
    event.stopPropagation()
    fun?.()
  }, [fun])
}
