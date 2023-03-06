import {Modal} from "@/components";
import {Button, TextInput} from "flowbite-react";
import {FC, memo} from "react";
import {
  closeEditLayer,
  useEditLayerInputValue,
  useEditLayerOpen,
  setEditLayerInputValue, submitEditLayer
} from "@/components/admin/note/store";


export const EditNoteLayer: FC = memo(() => {
  const isOpen = useEditLayerOpen()
  const inputValue = useEditLayerInputValue()
  return (
    <Modal
      show={isOpen}
      onClose={closeEditLayer}
    >
      <Modal.Header>修改笔记名称</Modal.Header>
      <Modal.Body className="pt-10">
        <TextInput onChange={(e) => setEditLayerInputValue(e.target.value)} id="noteName" type="text" value={inputValue}
                   placeholder="请输入笔记名称" required/>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={submitEditLayer}>确定</Button>
        <Button onClick={closeEditLayer} color="gray">取消</Button>
      </Modal.Footer>
    </Modal>
  )
})
