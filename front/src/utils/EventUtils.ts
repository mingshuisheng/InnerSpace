import {useEffect, useRef} from "react";


type TargetType = {
  __safe_ontouchend?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined;
  __safe_ontouchmove?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined;
  __safe_ontouchstart?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined

  __safe_onmousedown: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined;
  __safe_onmousemove: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined;
  __safe_onmouseup: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null | undefined;
}

export function useLongPush<T extends HTMLElement>(onLongPush: () => void) {
  const ref = useRef<T | null>(null)
  useEffect(() => {
    if (!ref.current) return
    let timeoutId: NodeJS.Timeout

    const setLongPushTimeout = () => {
      timeoutId = setTimeout(() => {
        onLongPush()
      }, 400)
    }

    const clearLongPushTimout = () => {
      clearTimeout(timeoutId)
    }

    const el = ref.current as unknown as (HTMLElement & TargetType)
    el.__safe_ontouchstart = ref.current.ontouchstart
    el.ontouchstart = (e) => {
      setLongPushTimeout()
      el.__safe_ontouchend?.(e)
    }

    el.__safe_ontouchmove = ref.current.ontouchmove
    el.ontouchmove = (e) => {
      clearLongPushTimout()
      el.ontouchmove?.(e)
    }

    el.__safe_ontouchend = (e) => {
      clearLongPushTimout()
      el.ontouchend?.(e)
    }

    el.__safe_onmousedown = el.onmousedown
    el.onmousedown = (e) => {
      setLongPushTimeout()
      el.__safe_onmousedown?.(e)
    }
    el.__safe_onmousemove = el.onmousemove
    el.onmousemove = (e) => {
      clearLongPushTimout()
      el.__safe_onmousemove?.(e)
    }

    el.__safe_onmouseup = el.onmouseup
    el.onmouseup = (e) => {
      clearLongPushTimout()
      el.__safe_onmouseup?.(e)
    }


    return () => {
      el.ontouchstart = el.__safe_ontouchstart
      el.ontouchmove = el.__safe_ontouchmove
      el.ontouchend = el.__safe_ontouchend

      el.__safe_ontouchstart = undefined
      el.__safe_ontouchmove = undefined
      el.__safe_ontouchend = undefined

      el.onmousedown = el.__safe_onmousedown || null
      el.onmousemove = el.__safe_onmousemove || null
      el.onmouseup = el.__safe_onmouseup || null

      el.__safe_onmousedown = undefined
      el.__safe_onmousemove = undefined
      el.__safe_onmouseup = undefined
    }
  }, [onLongPush])

  return ref
}

//接收一个函数作为参数，这个参数是一个函数，拦截默认的保存事件，并且调用传入的函数
export const useOnSave = <T extends HTMLElement>(onSave: () => void) => {
  useEffect(() => {
    const save = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault()
        onSave()
      }
      return false
    }

    document.addEventListener('keydown', save)
    return () => {
      document.removeEventListener('keydown', save)
    }

  }, [onSave])
}
