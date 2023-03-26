import {
  Controller,
  FileTypeValidator, Get,
  MaxFileSizeValidator, NotFoundException, Param, ParseFilePipe, ParseIntPipe,
  Post, Res, UploadedFile,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {FileInterceptor} from "@nestjs/platform-express";
import {ImageService} from "./image.service";
import {createReadStream} from "fs";
import type {Response} from 'express';
import {join} from "path";
import * as process from "process";

@Controller('image')
export class ImageController {

  constructor(private imageService: ImageService) {
  }

  @Get('all')
  getAllImageVo() {
    return this.imageService.getAll()
  }

  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile(
    new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({maxSize: 1024 * 1024 * 10}),
        new FileTypeValidator({fileType: 'image/*'})
      ]
    })
  ) file: Express.Multer.File) {
    return this.imageService.upload(file)
  }

  @Get(':id')
  async download(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const [image, path] = await this.imageService.download(id);

    //如果没有找到图片，则返回404
    if (!image) {
      throw new NotFoundException()
    }

    //设置响应头,文件类型根据path后缀名来设置
    res.set({
      'Content-Type': `image/${path.split('.').pop()}`,
      'Content-Disposition': `attachment; filename=${encodeURI(image.originalName)}`
    })

    const file = createReadStream(join(process.cwd(), path));
    file.pipe(res)
  }

}
