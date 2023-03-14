import {buildApi, BuildApiParams, BuildApiReturn, concatUrl} from "@/utils/NetworkUtils";
import {NoteApi, NoteApiType} from "@/server/api/note";
import {getAccessToken} from "@/server/api/TokenManager";
import {newFetra} from "@/utils/fetra";
import {authApi, AuthApiType, loginUrl} from "@/server/api/auth";
import {nextApi, NextApiType} from "@/server/api/nextApi";
import {backendUrl} from "@/common/backend";

type TotalApiType = NoteApiType & AuthApiType & NextApiType
type ApiType = BuildApiReturn<TotalApiType>

const totalApiParams: BuildApiParams<TotalApiType> = {...NoteApi, ...authApi, ...nextApi}

const getBaseUrl = () => process.browser ? "/sapi" : backendUrl;

//创建fetra实例，并添加请求前后的处理
const createFetra = () => {
  const fetra = newFetra(getBaseUrl())
  //如果是浏览器则需要添加token，如果token过期则需要尝试使用refreshToken刷新token
  if (process.browser) {
    fetra.beforeRequest(async (input, init) => {
      if (getAccessToken()) {
        return [input, {...init, headers: {...init.headers, "Authorization": `Bearer ${getAccessToken()}`}}]
      }
      return [input, init]
    })
  }

  return fetra
}

export const fetra = createFetra()
export const api: ApiType = buildApi<TotalApiType>(totalApiParams, fetra)

export const isLoginUrl = (url: string) => url === loginUrl || concatUrl(getBaseUrl(), loginUrl) === url
