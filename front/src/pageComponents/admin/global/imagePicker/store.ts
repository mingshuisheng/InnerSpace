import {create} from 'zustand'
import {api} from "@/server/api";
import {ImageVo, toAccessUrl} from "@/server/api/image";
import {BrowserUtils} from "@/utils/BrowserUtils";
import {useMemoizedFn} from "ahooks";

interface ImagePickerStore {
  open: boolean
  imageList: ImageVo[]
}

const imagePickerStore = create<ImagePickerStore>(() => ({
  open: false,
  imageList: []
}))

const imagePickerOpenSelector = (state: ImagePickerStore) => state.open
export const useImagePickerOpen = () => imagePickerStore(imagePickerOpenSelector)
export const closeImagePicker = () => imagePickerStore.setState({open: false})
export const toggleImagePicker = () => imagePickerStore.setState(state => ({open: !state.open}))
export const imageListSelector = (state: ImagePickerStore) => state.imageList
export const useImageList = () => imagePickerStore(imageListSelector)

export const loadImage = async () => {
  const imageList = await api.allImages();
  imagePickerStore.setState({imageList})
}

export const onImageClick = async (image: ImageVo) => {
  await BrowserUtils.writeToClipboard(`![](${toAccessUrl(image)})`)
  closeImagePicker()
}

export const uploadImage = async (files: File[]) => {
  await api.uploadImage(files[0]);
  await loadImage()
}
