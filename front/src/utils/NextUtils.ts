import {FileUtil} from "@/utils/FileUtil";
import {cwd} from "process";
import {join} from "path"
import {NextApiResponse} from "next";

export namespace NextUtils {

  export async function getPages(dir: string): Promise<string[]> {
    const files = await FileUtil.getFiles(dir);
    return files.filter(file => file.endsWith(".html")).map(file => file.replaceAll(".html", ""))
  }

  export async function revalidatePages(routePath: string, res: NextApiResponse) {
    const targetPath = join(cwd(), ".next", "server", "pages", routePath)
    const pathVariables = await getPages(targetPath);

    pathVariables.forEach(pathVariable => {
      res.revalidate(`${routePath}/${pathVariable}`).then()
    })

  }
}
