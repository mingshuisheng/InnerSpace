import {useCallback, useRef, useState} from "react";
import {useLongPress} from "ahooks";

export function MiniGame() {
  const [count, setCount] = useState<number>(0);

  const buttonRef = useRef<HTMLDivElement>(null)
  useLongPress(() => setCount(0), buttonRef);

  const buttonClick = useCallback(() => {
    setCount(count => count + 1)
  }, [])

  return (
    <div
      ref={buttonRef}
      onTouchStart={buttonClick}
      onMouseDown={buttonClick}
      className="absolute bottom-10 right-10 w-12 h-12 rounded-full z-20 flex justify-center items-center text-xl select-none hover:cursor-pointer bg-blue-500 shadow-lg shadow-blue-500/50">
      {count === 0 ? "点我" : count}
    </div>
  )
}
