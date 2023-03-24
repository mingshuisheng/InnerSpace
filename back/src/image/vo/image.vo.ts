import {Image} from "../../entity/image.entity";

export interface ImageVo{
  id: number
  name: string
}

export const toImageVo = (image: Image): ImageVo => {
  return {
    id: image.id,
    name: image.originalName
  }
}
