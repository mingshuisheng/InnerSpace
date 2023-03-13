import {create} from 'zustand'
import {api} from "@/server/api";
import {NoteData, NullNoteData, RootNoteData} from "@/types/NoteData";

const {getNoteTree, addNote, modifyNote, deleteNote, getNoteContent, modifyNoteContent} = api

// 侧边栏的数据
interface NoteDataAsideStore {
  noteDataArr: NoteData[]
  selectedNoteData: NoteData
}

const noteDataAsideStore = create<NoteDataAsideStore>(() => ({
  noteDataArr: [],
  selectedNoteData: RootNoteData
}))
export const reloadNoteDataList = async () => {
  const data = await getNoteTree()
  noteDataAsideStore.setState({noteDataArr: data})
}
const noteDataArrSelector = (state: NoteDataAsideStore) => state.noteDataArr
export const useNoteDataArr = () => noteDataAsideStore(noteDataArrSelector)
const selectedNoteDataSelector = (state: NoteDataAsideStore) => state.selectedNoteData
export const useSelectedNoteData = () => noteDataAsideStore(selectedNoteDataSelector)
export const setSelectNoteData = async (noteData: NoteData) => {
  noteDataAsideStore.setState({selectedNoteData: noteData})
  const newNoteData = await getNoteContent(noteData.id)
  setNoteContent(newNoteData.content || "")
  setInputContent(newNoteData.content || "")
}
export const addNoteData = (noteData: NoteData) => openAddLayer(noteData)
export const editNoteData = (noteData: NoteData) => openEditLayer(noteData)
export const deleteNoteData = (noteData: NoteData) => openDeleteLayer(noteData)

// 添加笔记的弹窗
interface AddLayerStore {
  open: boolean
  inputValue: string
  noteData: NoteData
}

const addLayerStore = create<AddLayerStore>(() => ({
  open: false,
  inputValue: "",
  noteData: NullNoteData
}))
const addLayerOpenSelector = (state: AddLayerStore) => state.open
export const useAddLayerOpen = () => addLayerStore(addLayerOpenSelector)
const addLayerInputValueSelector = (state: AddLayerStore) => state.inputValue
export const useAddLayerInputValue = () => addLayerStore(addLayerInputValueSelector)
export const setAddLayerInputValue = (inputValue: string) => addLayerStore.setState({inputValue})
export const openAddLayer = (noteData: NoteData) => addLayerStore.setState({open: true, inputValue: "", noteData})
export const closeAddLayer = () => addLayerStore.setState({open: false, noteData: NullNoteData})
export const submitAddLayer = async () => {
  const parentId = addLayerStore.getState().noteData.id;
  await addNote(parentId === NullNoteData.id ? null : parentId, addLayerStore.getState().inputValue)
  await reloadNoteDataList()
  closeAddLayer()
}

// 编辑笔记的弹窗
interface EditLayerStore {
  open: boolean
  inputValue: string
  noteData: NoteData
}

const editLayerStore = create<EditLayerStore>(() => ({
  open: false,
  inputValue: "",
  noteData: NullNoteData
}))
const editLayerOpenSelector = (state: EditLayerStore) => state.open
export const useEditLayerOpen = () => editLayerStore(editLayerOpenSelector)
const editLayerInputValueSelector = (state: EditLayerStore) => state.inputValue
export const useEditLayerInputValue = () => editLayerStore(editLayerInputValueSelector)
export const setEditLayerInputValue = (inputValue: string) => editLayerStore.setState({inputValue})
export const openEditLayer = (noteData: NoteData) => editLayerStore.setState({
  open: true,
  inputValue: noteData.name,
  noteData
})
export const closeEditLayer = () => editLayerStore.setState({open: false, inputValue: "", noteData: NullNoteData})
export const submitEditLayer = async () => {
  await modifyNote(editLayerStore.getState().noteData.id, editLayerStore.getState().inputValue)
  await reloadNoteDataList()
  closeEditLayer()
}

// 删除笔记的弹窗
interface DeleteLayerStore {
  open: boolean
  noteData: NoteData
}

const deleteLayerStore = create<DeleteLayerStore>(() => ({
  open: false,
  noteData: NullNoteData
}))
const deleteLayerOpenSelector = (state: DeleteLayerStore) => state.open
export const useDeleteLayerOpen = () => deleteLayerStore(deleteLayerOpenSelector)
const deleteLayerNoteDataSelector = (state: DeleteLayerStore) => state.noteData
export const useDeleteLayerNoteData = () => deleteLayerStore(deleteLayerNoteDataSelector)
export const openDeleteLayer = (noteData: NoteData) => deleteLayerStore.setState({open: true, noteData})
export const closeDeleteLayer = () => deleteLayerStore.setState({open: false, noteData: NullNoteData})
export const submitDeleteLayer = async () => {
  await deleteNote(deleteLayerStore.getState().noteData.id)
  await reloadNoteDataList()
  closeDeleteLayer()
}

//笔记内容
interface NoteContentStore {
  noteContent: string
  inputContent: string
}

const noteContentStore = create<NoteContentStore>(() => ({
  noteContent: '',
  inputContent: ''
}))
const inputContentSelector = (state: NoteContentStore) => state.inputContent
export const useInputContent = () => noteContentStore(inputContentSelector)
export const setNoteContent = (noteContent: string) => noteContentStore.setState({
  noteContent,
  inputContent: noteContent
})
export const setInputContent = (inputContent: string) => noteContentStore.setState({inputContent})
export const saveNoteContent = async () => {
  const inputContent = noteContentStore.getState().inputContent
  const id = noteDataAsideStore.getState().selectedNoteData.id
  await modifyNoteContent(id, inputContent)
  setNoteContent(noteContentStore.getState().inputContent)
}
