// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {NextUtils} from "@/utils/NextUtils";
import {bePostHandler} from "@/utils/ApiHandler";
import {api} from "@/server/api";

type Data = {
  success: boolean
}

export default bePostHandler<Data>(async (req, res) => {
  const result = await api.checkToken(req.cookies.accessToken)
  if (result.isValid) {
    NextUtils.revalidatePages(req.body.path, res).then()
    res.status(200).json({success: true})
    return
  }
  res.status(401).json({success: false})
})
