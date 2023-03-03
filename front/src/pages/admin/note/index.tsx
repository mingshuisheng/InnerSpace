import {FC, useCallback, useEffect, useMemo, useState} from "react";
import {DeleteNoteLayer, Head, Modal, NoteManagerLayout} from "@/components";
import {NoteData, RootNoteData} from "@/types/NoteData";
import {getNoteTree} from "@/server/api";
import {Button, TextInput} from "flowbite-react";
import {flatNoteData} from "@/utils/DataUtils";
import {addNote, deleteNote, modifyNote} from "@/server/api/note";
import {Simulate} from "react-dom/test-utils";


type State = {
  type: "add" | "edit" | "delete",
  noteData: NoteData
}

const NoteManager: FC = () => {
  const {noteDataList, reloadTree} = useNoteList()

  const [showAddOrEditLayer, setShowAddOrEditLayer] = useState(false)
  const [showDeleteLayer, setShowDeleteLayer] = useState(false)
  const [state, setState] = useState<State>({type: "add", noteData: RootNoteData})
  const [selectedNote, setSelectedNote] = useState<NoteData>({id: 0, name: "root"})
  const [inputValue, setInputValue] = useState<string>("")

  const noteMap = useMemo(() =>
    flatNoteData(...noteDataList)
      .reduce((map, noteData) => {
        map.set(noteData.id, noteData)
        return map
      }, new Map<number, NoteData>()), [noteDataList])

  const handlerAdd = useCallback((id: number) => {
    setState({
      type: "add",
      noteData: id === 0 ? RootNoteData : noteMap.get(id)!,
    })
    setInputValue("")
    setShowAddOrEditLayer(true);
  }, [noteMap])

  const handlerEdit = useCallback((id: number) => {
    const noteData = noteMap.get(id)!;
    setState({
      type: "edit",
      noteData: noteData,
    })
    setInputValue(noteData.name)
    setShowAddOrEditLayer(true);
  }, [noteMap])

  const handlerDelete = useCallback((id: number) => {
    setState({
      type: "delete",
      noteData: noteMap.get(id)!,
    })
    setShowDeleteLayer(true)
  }, [noteMap])

  const handleSelection = useCallback((id: number) => {
    setSelectedNote(noteMap.get(id)!)
  }, [noteMap])

  const handleOkBtn = useCallback(async () => {
    if (inputValue === "" || (state.type === "edit" && inputValue === state.noteData.name)) {
      return
    }
    try {
      await (state.type === "add" ? addNote : modifyNote)(state.noteData.id, inputValue);
      await reloadTree()
    } catch (e) {
      console.error(e)
    }
    setShowAddOrEditLayer(false)
  }, [state, reloadTree, inputValue]);


  const handleCancelBtn = useCallback(() => setShowAddOrEditLayer(false), []);

  const handleDeleteOkBtn = useCallback(async () => {
    try {
      await deleteNote(state.noteData.id)
      await reloadTree()
    } catch (e) {
      console.error(e)
    }
    setShowDeleteLayer(false)
  }, [state, reloadTree])

  const handleDeleteCancelBtn = useCallback(() => setShowDeleteLayer(false), [])

  return (
    <Head pageTitle={selectedNote.id === 0 ? "笔记管理页面" : "笔记-" + selectedNote.name}>
      <NoteManagerLayout noteDataList={noteDataList} onAdd={handlerAdd} onEdit={handlerEdit} onDelete={handlerDelete}
                         onSelectionChange={handleSelection}>
      </NoteManagerLayout>

      <Modal
        show={showAddOrEditLayer}
        onClose={handleCancelBtn}
      >
        <Modal.Header>{state.type === "add" ? "添加" : "编辑"}笔记</Modal.Header>
        <Modal.Body className="pt-10">
          <TextInput onChange={(e) => setInputValue(e.target.value)} id="noteName" type="text" value={inputValue}
                     placeholder="请输入笔记名称" required/>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleOkBtn}>确定</Button>
          <Button onClick={handleCancelBtn} color="gray">取消</Button>
        </Modal.Footer>
      </Modal>

      <DeleteNoteLayer showDeleteLayer={showDeleteLayer} handleDeleteCancelBtn={handleDeleteCancelBtn}
                       noteData={state.noteData}
                       handleDeleteOkBtn={handleDeleteOkBtn}/>
    </Head>
  )
}

const useNoteList = () => {
  const [noteDataList, setNoteDataList] = useState<NoteData[]>([])

  const reloadTree = useCallback(async function () {
    let data = await getNoteTree();
    setNoteDataList(data.children!)
  }, [setNoteDataList]);

  useEffect(() => {
    reloadTree().then()
  }, [])
  return {noteDataList, reloadTree}
}

export default NoteManager
