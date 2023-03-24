import React, {FC, useCallback, useEffect, useRef, useState} from "react";
import {Drawer, DropZone} from "@/components";
import {useDrag, useDrop, useEventListener, useKeyPress, useMemoizedFn, useMount} from "ahooks";
import {useClipboard} from "@/hooks/useClipboard";
import {ImageVo, toAccessUrl} from "@/server/api/image";
import {api} from "@/server/api";
import classNames from "classnames";

export const ImagePicker: FC = () => {
  const [open, setOpen] = useState(false)
  const onClose = useMemoizedFn(() => setOpen(false))
  const pickRef = useRef<HTMLDivElement | null>(null)

  useKeyPress("esc", () => setOpen(false))
  useKeyPress("ctrl.shift.i", e => {
    e.preventDefault()
    setOpen(!open)
  })

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        pickRef.current?.focus()
      }, 100)
    } else {
      setTimeout(() => {
        pickRef.current?.blur()
      })
    }
  }, [open])

  const {copyToClipboard} = useClipboard();

  const [images, setImages] = useState<ImageVo[]>([])

  const loadImage = useMemoizedFn(async () => {
    const imageVos = await api.allImages();
    setImages(imageVos)
  })
  useMount(loadImage)

  const onImageClick = useMemoizedFn((image: ImageVo) => {
    copyToClipboard(`![](${toAccessUrl(image)})`)
    onClose()
  })


  const onAcceptFile = useMemoizedFn(async (files: File[]) => {
    const res = await api.uploadImage(files[0]);
    await loadImage()
  })


  return (
    <Drawer open={open} position="right" onClose={onClose}>
      <div className="relative w-max h-full">
        <div className="sticky w-full h-1/6 p-2">
          <DropZone onAcceptFile={onAcceptFile}/>
        </div>
        <div ref={pickRef} tabIndex={0} className="flex flex-col items-center gap-5 p-5 overflow-auto">
          {
            images.map((image) => (
              <ImageItem key={image.id} src={toAccessUrl(image)} name={image.name} onClick={() => onImageClick(image)}/>
            ))
          }
        </div>
      </div>
    </Drawer>
  )
}

type ImageItemProps = {
  onClick: () => void,
  src: string
  name: string
}

const ImageItem: FC<ImageItemProps> = ({onClick, src, name}) => {
  return (
    <div onClick={onClick}
         className="flex flex-col items-center shrink-0 hover:cursor-pointer border-2 border-blue-500 p-2 rounded">
      <div className="max-w-[400px]">
        <img
          className="w-full h-auto object-cover"
          src={src}
          alt={name}/>
      </div>
      <div>{name}</div>
    </div>
  )
}
