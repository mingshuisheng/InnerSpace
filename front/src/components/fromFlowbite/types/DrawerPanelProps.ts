import {PropsWithChildren} from "react";

export interface DrawerPanelProps extends PropsWithChildren {
  open: boolean
  position?: "top" | "bottom" | "left" | "right"
  onClose?: () => void
}
