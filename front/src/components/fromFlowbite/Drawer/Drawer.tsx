import {FC, memo, useRef} from "react";
import {DrawerProps} from "../types/DrawerProps";
import {createPortal} from "react-dom";
import {DrawerPanel} from "./DrawerPanel"
import {useMount} from "ahooks";


export const Drawer: FC<DrawerProps> = memo(({children, ...rest}) => {
  const target = useRef<HTMLElement | null>(null)

  useMount(() => {
    target.current = document.body
  })

  return target.current ? createPortal(<DrawerPanel {...rest}>{children}</DrawerPanel>, target.current) : <></>
})

Drawer.displayName = "Drawer"
