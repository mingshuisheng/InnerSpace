import {Injectable, OnApplicationBootstrap} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {getImageConfig, ImageConfig} from "../config/image.config";
import {FileUtil} from "../utils/file.util";
import {v4 as uuidv4} from 'uuid';
import * as path from "path";
import {Repository} from "typeorm";
import {Image} from "../entity/image.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {toImageVo} from "./vo/image.vo";

@Injectable()
export class ImageService implements OnApplicationBootstrap{
  private imageConfig: ImageConfig

  constructor(
    private configService: ConfigService,
    @InjectRepository(Image)
    private imageRepository: Repository<Image>) {
    this.imageConfig = getImageConfig(this.configService)
  }

  async upload(file: Express.Multer.File) {
    //生成uuid.并且去掉-,然后加上后缀
    const uuid = uuidv4().replace(/-/g, "") + path.extname(file.originalname)
    //生成文件名
    const fileName = path.join(this.imageConfig.savePath, uuid)
    //写入文件
    await FileUtil.writeFileBuffer(fileName, file.buffer)

    //创建实体，如果原文件名称过长，则截取并保留后100个字符
    const image = this.imageRepository.create({
      originalName: file.originalname.length > 100 ? file.originalname.substring(file.originalname.length - 100) : file.originalname,
      fileName: uuid
    })

    //保存实体
    await this.imageRepository.save(image)

    return {success: true}
  }

  async onApplicationBootstrap() {
    if(!await FileUtil.exists(this.imageConfig.savePath)){
      await FileUtil.mkdir(this.imageConfig.savePath)
    }
  }

  async download(id: number) {
    const image = await this.imageRepository.findOneBy({id});
    return [image, image ? path.join(this.imageConfig.savePath, image.fileName) : null] as const
  }

  async getAll() {
    const images = await this.imageRepository.find({});

    return images.map(toImageVo)
  }
}
