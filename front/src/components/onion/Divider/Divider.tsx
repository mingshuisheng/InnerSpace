import {FC} from "react";

export interface DividerProps{

}

export const Divider: FC<DividerProps> = () => {
  return(
    <div className="h-full w-0.5 bg-gray-400 rounded-sm"/>
  )
}
