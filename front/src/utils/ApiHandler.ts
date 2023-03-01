import {NextApiHandler} from "next";


export function createMethodLimitFunction(handler: NextApiHandler, ...methods: string[]){
  const newHandler: NextApiHandler = (req, res) => {
    if (!methods.includes(req.method || "")) {
      res.status(405).end('Method Not Allowed')
      return
    }
    handler(req, res)
  }
}

export function beGetHandler(handler: NextApiHandler){
  return createMethodLimitFunction(handler, "GET")
}

export function bePostHandler(handler: NextApiHandler){
  return createMethodLimitFunction(handler, "POST")
}

export function bePutHandler(handler: NextApiHandler){
  return createMethodLimitFunction(handler, "PUT")
}

export function beDeleteHandler(handler: NextApiHandler){
  return createMethodLimitFunction(handler, "DELETE")
}
