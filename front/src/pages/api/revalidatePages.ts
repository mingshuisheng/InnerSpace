// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {NextUtils} from "@/utils/NextUtils";
import {bePostHandler} from "@/utils/ApiHandler";
import {api} from "@/server/api";

type Data = {
  success: boolean
}

export default bePostHandler<Data>(async (req, res) => {
  if (req.headers['authorization'] && typeof req.body.path === "string") {
    const token = req.headers['authorization'].split(' ')[1]
    if (token) {
      const result = (await api.checkToken(token)) as unknown as {isValid: boolean};
      if(result.isValid){
        NextUtils.revalidatePages(req.body.path, res).then()
      }
    }
  }
  res.status(200);
  res.json({success: true})
})
