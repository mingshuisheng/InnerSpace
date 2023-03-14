import {NextApiHandler} from "next";


export function createMethodLimitFunction<T>(handler: NextApiHandler<T>, ...methods: string[]){
  const newHandler: NextApiHandler<T> = (req, res) => {
    if (!methods.includes(req.method || "")) {
      res.status(405).end('Method Not Allowed')
      return
    }
    handler(req, res)
  }

  return newHandler
}

export function beGetHandler<T>(handler: NextApiHandler<T>){
  return createMethodLimitFunction(handler, "GET")
}

export function bePostHandler<T>(handler: NextApiHandler<T>){
  return createMethodLimitFunction(handler, "POST")
}

export function bePutHandler<T>(handler: NextApiHandler<T>){
  return createMethodLimitFunction(handler, "PUT")
}

export function beDeleteHandler<T>(handler: NextApiHandler<T>){
  return createMethodLimitFunction(handler, "DELETE")
}
