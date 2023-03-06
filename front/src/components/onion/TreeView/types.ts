import {FC} from "react";

export interface TreeData {
  id: number
  name: string
  children?: TreeData[]
}

export interface TreeItemLabelProps {
  data: TreeData
}

export type TreeItemLabelComponent = FC<TreeItemLabelProps>
