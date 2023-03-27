//接收一个函数作为参数，这个参数是一个函数，拦截默认的保存事件，并且调用传入的函数
import {useKeyPress} from "ahooks";

export const useOnSave = <T extends HTMLElement>(onSave: () => void) => {

  useKeyPress("ctrl.s", e => {
    e.preventDefault()
    onSave?.()
  }, {target: document})

}
