import {memo} from "react";
import {Modal} from "@/components";
import {HiOutlineExclamationCircle} from "react-icons/hi";
import {Button} from "flowbite-react";
import {NoteData} from "@/types/NoteData";

type DeleteLayerProps = {
  showDeleteLayer: boolean,
  handleDeleteCancelBtn: () => void,
  noteData: NoteData,
  handleDeleteOkBtn: () => void
}
export const DeleteNoteLayer = memo(function DeleteLayer({
                                                       showDeleteLayer,
                                                       handleDeleteCancelBtn,
                                                       noteData,
                                                       handleDeleteOkBtn
                                                     }: DeleteLayerProps) {
  return <Modal
    show={showDeleteLayer}
    size="md"
    popup={true}
    onClose={handleDeleteCancelBtn}
  >
    <Modal.Header/>
    <Modal.Body>
      <div className="text-center">
        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-red-600 dark:text-red-600"/>
        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
          你确定删除{noteData?.name}？
        </h3>
        <div className="flex justify-center gap-4">
          <Button
            color="failure"
            onClick={handleDeleteOkBtn}
          >
            确定
          </Button>
          <Button
            color="gray"
            onClick={handleDeleteCancelBtn}
          >
            取消
          </Button>
        </div>
      </div>
    </Modal.Body>
  </Modal>;
})
