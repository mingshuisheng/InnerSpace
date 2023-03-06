import {TreeItemLabelComponent} from "@/components/onion/TreeView/types";

export const TreeItemLabel: TreeItemLabelComponent = ({data}) => {
  return (
    <div title={data.name}>
      {data.name}
    </div>
  )
}
