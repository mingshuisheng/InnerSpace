import {ConfigService} from "@nestjs/config";

export interface ImageConfig{
  savePath: string
}

export const imageConfigName = "image"

export const getImageConfig = (configService: ConfigService): ImageConfig => {
  const imageConfig = configService.get<ImageConfig>(imageConfigName)
  if (configService.get<string>("IMAGE_SAVE_PATH")) {
    imageConfig.savePath = configService.get<string>("IMAGE_SAVE_PATH")
  }

  return imageConfig
}
