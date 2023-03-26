import {Ref, useEffect, useRef} from "react";

const focusEl = (target: HTMLElement, focus: boolean) => {
  setTimeout(() => {
    focus ? target.focus() : target.blur()
  }, 100)
}

export const useFocus = <T extends HTMLElement>(focus: boolean): Ref<T> => {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (ref.current) {
      focusEl(ref.current, focus)
    }
  }, [focus])

  return ref
}
