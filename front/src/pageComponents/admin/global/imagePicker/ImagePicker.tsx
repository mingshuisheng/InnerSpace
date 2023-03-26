import React, {FC, Ref} from "react";
import {Drawer, DropZone} from "@/components";
import {useKeyPress, useMount} from "ahooks";
import {toAccessUrl} from "@/server/api/image";
import {ImageItem} from "@/pageComponents/admin/global/imagePicker/ImageItem";
import {
  closeImagePicker,
  loadImage, onImageClick,
  toggleImagePicker, uploadImage, useImageList,
  useImagePickerOpen
} from "@/pageComponents/admin/global/imagePicker/store";
import {useFocus} from "@/hooks/useFocus";
import {useAutoAnimate} from "@formkit/auto-animate/react";

export const ImagePicker: FC = () => {
  const isOpen = useImagePickerOpen()
  const imageList = useImageList()
  const pickRef: Ref<HTMLDivElement> = useFocus(isOpen);
  const [parent] = useAutoAnimate()

  useKeyPress("esc", e => {
    if (isOpen) {
      e.preventDefault()
      closeImagePicker()
    }
  })
  useKeyPress("ctrl.shift.i", e => {
    e.preventDefault()
    toggleImagePicker()
  })

  useMount(loadImage)

  return (
    <Drawer open={isOpen} position="right" onClose={closeImagePicker}>
      <div ref={pickRef} tabIndex={0} className="relative w-max h-full">
        <div className="sticky w-full h-1/6 p-2">
          <DropZone onAcceptFile={uploadImage}/>
        </div>
        <div ref={parent} className="flex flex-col items-center gap-5 p-5 overflow-auto">
          {
            imageList.map((image) => (
              <ImageItem key={image.id} src={toAccessUrl(image)} name={image.name} onClick={() => onImageClick(image)}/>
            ))
          }
        </div>
      </div>
    </Drawer>
  )
}
