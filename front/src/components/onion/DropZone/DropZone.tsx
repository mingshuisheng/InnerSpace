import {FC, forwardRef, memo, useRef, useState} from "react";
import {HiOutlineCloudUpload} from "react-icons/hi"
import {useDrop, useEventListener, useHover} from "ahooks";
import {BrowserUtils} from "@/utils/BrowserUtils";
import classNames from "classnames";
import {useMergeRefs} from "@floating-ui/react";

export interface DropZoneProps {
  className?: string
  onAcceptFile?: (files: File[]) => void
}

export const DropZone = memo(forwardRef<HTMLDivElement, DropZoneProps>(({className, onAcceptFile}, myRef) => {
  const dropRef = useRef<HTMLDivElement | null>(null);
  const rootRefs = useMergeRefs<HTMLDivElement>([dropRef, myRef]);

  const isHover = useHover(dropRef)

  const [isEnter, setIsEnter] = useState(false)

  useDrop(dropRef, {
    onDragEnter: () => setIsEnter(true),
    onDragLeave: () => setIsEnter(false),
    onFiles: async (files, event) => {
      const result = await BrowserUtils.flatDataTransferItems(event?.dataTransfer.items);
      const fileList = result.reduce((arr, item) => arr.concat(item.data.map(info => info.file)), new Array<File>());
      onAcceptFile?.(fileList)
    }
  })

  useEventListener("dragover", (e) => {
  })

  const rootClassName = "flex items-center justify-center w-full h-full border-2 border-dashed rounded-lg"

  return (
    <div ref={rootRefs} tabIndex={0} className={classNames(rootClassName, className, {
      "dark:bg-bray-800 bg-gray-100 dark:border-gray-500 dark:bg-gray-600 border-blue-700 dark:border-blue-400": isEnter || isHover,
      "border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700": !isEnter && !isHover
    })}>
      <div className="flex flex-col items-center justify-center text-gray-400">
        <HiOutlineCloudUpload className="w-10 h-10 mb-3"/>
        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span
          className="font-semibold">Click to upload</span> or drag and drop</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
      </div>
    </div>
  )
}))

DropZone.displayName = "DropZone"
