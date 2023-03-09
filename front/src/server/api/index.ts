import {buildApi, BuildApiParams, BuildApiReturn} from "@/utils/NetworkUtils";
import {NoteApi, NoteApiType} from "@/server/api/note";
import {getAccessToken, getRefreshToken, setToken} from "@/server/api/TokenManager";
import {newFetra} from "@/utils/fetra";
import {authApi, AuthApiType} from "@/server/api/auth";

type TotalApiType = NoteApiType & AuthApiType
type ApiType = BuildApiReturn<TotalApiType>

const totalApiParams: BuildApiParams<TotalApiType> = {...NoteApi, ...authApi}

const getBaseUrl = () => process.browser ? "/sapi" : "http://localhost:8080";

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
