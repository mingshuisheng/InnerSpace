import {readdir, exists} from "fs"
import {promisify} from "util"

export namespace FileUtil{
  const fsReaddir = promisify(readdir)

  const fsExists = promisify(exists)

  export async function getFiles(dir: string): Promise<string[]> {
    if(!(await fsExists(dir))){
      return []
    }
    return  fsReaddir(dir);
  }


}
