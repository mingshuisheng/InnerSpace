'use client'

import {useCallback, useState} from "react";
import {useLongPush} from "@/utils/EventUtils";
import {usePathname} from "next/navigation";

export function MiniGame() {
  const [count, setCount] = useState<number>(0);
  const buttonRef = useLongPush<HTMLDivElement>(useCallback(() => {
    setCount(0)
  }, []));

  const buttonClick = useCallback(() => {
    setCount(count => count + 1)
  }, [])
  let pathname = usePathname();

  return (
    <div
      style={{display: pathname === "/"? "flex": "none"}}
      ref={buttonRef}
      onTouchStart={buttonClick}
      onMouseDown={buttonClick}
         className="absolute bottom-10 right-10 w-12 h-12 rounded-full z-20 flex justify-center items-center text-xl select-none hover:cursor-pointer bg-blue-500 shadow-lg shadow-blue-500/50">
      {count === 0 ? "点我" : count}
    </div>
  )
}
