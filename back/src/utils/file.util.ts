import fs from "fs";
import util from "util";

export namespace FileUtil {

  const fsMkdir = util.promisify(fs.mkdir);
  const fsExists = util.promisify(fs.exists);
  const fsWriteFile = util.promisify(fs.writeFile);
  const fsReadFile = util.promisify(fs.readFile);

  export async function exists(path: string){
    return await fsExists(path)
  }

  //检查文件夹是否存在，不存在则创建
  export async function mkdir(dirName: string){
    if(!await exists(dirName)){
      await fsMkdir(dirName)
    }
  }

  //如果文件存在则覆盖文件内容,编码格式是"utf-8"
  export async function writeFile(fileName: string, content: string){
    await fsWriteFile(fileName, content, {encoding: "utf-8"});
  }

  //读取文件内容
  export async function readFile(fileName: string){
    return await fsReadFile(fileName, {encoding: "utf-8"});
  }

}
