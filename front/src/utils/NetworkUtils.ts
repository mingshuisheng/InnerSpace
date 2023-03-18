import {Fetcher, Fetra} from "@/utils/fetra";
import {WrapFunction} from "@/utils/TypeUtils";

type WrapFetra = {
  get: <T = unknown>(url: string | URL, params?: Record<string, any>, headers?: HeadersInit) => Promise<T>
  post: <T = unknown>(url: string | URL, params?: Record<string, any>, headers?: HeadersInit) => Promise<T>
  put: <T = unknown>(url: string | URL, params?: Record<string, any>, headers?: HeadersInit) => Promise<T>
  delete: <T = unknown>(url: string | URL, params?: Record<string, any>, headers?: HeadersInit) => Promise<T>
  patch: <T = unknown>(url: string | URL, params?: Record<string, any>, headers?: HeadersInit) => Promise<T>
}

export type BuildApiParams<T extends Record<string, Function>> = WrapFunction<T, (fetra: WrapFetra) => void>
export type BuildApiReturn<T extends Record<string, Function>> = T & WrapFetra
type ParamKeys<T extends Record<string, Function>> = keyof T

export const buildApi = <T extends Record<string, Function>>(params: BuildApiParams<T>, fetraOrigin: Fetra): BuildApiReturn<T> => {

  const {get, post, put, patch, delete: del} = fetraOrigin

  const fetra: WrapFetra = {
    get: async <T = unknown>(url: string | URL, params: Record<string, any> = {}, headers: HeadersInit = {}) => {
      let requestUrl = url
      if (params) {
        requestUrl += "?" + new URLSearchParams(Object.entries(params)).toString()
      }
      const response = await get(requestUrl, {headers})
      const data = await response.json()
      return data as T
    },
    post: createWrapFetraFunction(post),
    put: createWrapFetraFunction(put),
    patch: createWrapFetraFunction(patch),
    delete: createWrapFetraFunction(del),
  }

  const keys: ParamKeys<T>[] = Object.keys(params) as ParamKeys<T>[]

  const result: BuildApiReturn<T> = {} as BuildApiReturn<T>

  for (let i = 0; i < keys.length; i++) {
    let key = keys[i]
    result[key] = params[key](fetra)
  }

  return result
}


const createWrapFetraFunction = (fun: Fetcher) => {
  return async <T = unknown>(url: string | URL, params: Record<string, any> = {}, headers: HeadersInit = {}) => {
    const init: RequestInit = {
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      }
    }
    if (params) {
      init.body = JSON.stringify(params)
    }
    const response = await fun(url, init);
    const data = await response.json()
    return data as T
  }
}

export const getUrlByInput = (input: RequestInfo | URL) => {
  if (typeof input === "string") {
    return input
  } else if (input instanceof URL) {
    return input.toString()
  }
  return input.url
}

export const concatUrl = (baseUrl: string, url: string) => {
  return `${baseUrl.replace(/\/$/, '')}/${url.replace(/^\//, '')}`;
}
