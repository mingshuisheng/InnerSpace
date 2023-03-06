import {Modal} from "@/components";
import {Button, TextInput} from "flowbite-react";
import {FC, memo} from "react";
import {
  closeAddLayer,
  setAddLayerInputValue, submitAddLayer,
  useAddLayerInputValue,
  useAddLayerOpen
} from "./store";


export const AddOrEditNoteLayer: FC = memo(() => {
  const inputValue = useAddLayerInputValue()
  const isOpen = useAddLayerOpen()

  return (
    <Modal
      show={isOpen}
      onClose={closeAddLayer}
    >
      <Modal.Header>添加笔记</Modal.Header>
      <Modal.Body className="pt-10">
        <TextInput onChange={(e) => setAddLayerInputValue(e.target.value)} id="noteName" type="text" value={inputValue}
                   placeholder="请输入笔记名称" required/>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={submitAddLayer}>确定</Button>
        <Button onClick={closeAddLayer} color="gray">取消</Button>
      </Modal.Footer>
    </Modal>
  )
})
