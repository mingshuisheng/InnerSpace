import React, {FC} from "react";
import Image from "next/image"

type ImageItemProps = {
  onClick: () => void,
  src: string
  name: string
}
export const ImageItem: FC<ImageItemProps> = ({onClick, src, name}) => {
  return (
    <div onClick={onClick}
         className="flex flex-col items-center shrink-0 hover:cursor-pointer border-2 border-blue-500 p-2 rounded">
      <div className="max-w-[400px]">
        <Image
          className="w-full h-auto object-cover"
          src={src}
          alt={name}/>
      </div>
      <div>{name}</div>
    </div>
  )
}
