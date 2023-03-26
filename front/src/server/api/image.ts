import {BuildApiParams} from "@/utils/NetworkUtils";
import {getBaseUrl} from "@/common/backend";

export type ImageVo = {
  id: number
  name: string
}

export type ImageApiType = {
  uploadImage: (file: File) => Promise<{ success: boolean }>
  // download: (id: number) => Promise<ImageVo>
  allImages: () => Promise<ImageVo[]>
}


export const imageApi: BuildApiParams<ImageApiType> = {
  uploadImage: fetra => file => {
    const fd = new FormData()
    fd.append('file', file)

    const init: RequestInit = {
      method: 'POST',
      body: fd,
      // headers: {"Content-Type": "multipart/form-data"}
    }

    return fetra.origin("/image/upload", init)
  },
  allImages: fetra => () => fetra.get<ImageVo[]>("/image/all")
}

export const toAccessUrl = (imageVo: ImageVo) => `${getBaseUrl()}/image/${imageVo.id}`
