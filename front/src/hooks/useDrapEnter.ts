import {useRef, DragEvent, useEffect} from "react";
import {useDrop, useLatest, useMount} from "ahooks";

export const useDragEnter = (onEnter: (event?: DragEvent) => void, onLeave: (event?: DragEvent) => void) => {
  const onEnterRef = useLatest(onEnter)
  const onLeaveRef = useLatest(onLeave)

  // const body = useRef<HTMLElement | null>(null)

  useEffect(() => {
    // body.current = document.body

    document.body.addEventListener("dragenter", e => {
      onEnter(e as any)
    })

    document.body.addEventListener("dragleave", e => {
      onLeave(e as any)
    })


  }, [])

  // useDrop(body,{
  //   onDragEnter: e => {
  //     console.log("onDragEnter")
  //     onEnter(e)
  //   },
  //   onDragLeave: e => {
  //     console.log("onDragLeave")
  //     onLeave(e)
  //   }
  // })

}
