// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {bePostHandler} from "@/utils/ApiHandler";
import {api} from "@/server/api";

type Data = {
  success: boolean
}

export default bePostHandler<Data>(async (req, res) => {
  const result = await api.checkToken(req.cookies.accessToken)
  if (result.isValid) {
    res.revalidate(req.body.path).then()
    res.status(200).json({success: true});
    return
  }
  res.status(401).json({success: false});
})
