import {create} from 'zustand'
import {api, fetra, isLoginUrl} from "@/server/api";
import {getRefreshToken, setToken, Token} from "@/server/api/TokenManager";
import {getUrlByInput} from "@/utils/NetworkUtils";
import {isResponseError} from "@/server/api/ResponseError";

const {login} = api

interface AuthStore {
  loginLayerOpened: boolean
  userName: string
  password: string
  loginSuccess: boolean
  loginErrorText: string
}

const authStore = create<AuthStore>(() => ({
  loginLayerOpened: true,
  userName: "",
  password: "",
  loginSuccess: false,
  loginErrorText: ""
}))

const loginLayerOpenedSelector = (state: AuthStore) => state.loginLayerOpened
export const useLoginLayerOpened = () => authStore(loginLayerOpenedSelector)
const userNameSelector = (state: AuthStore) => state.userName
export const useUserName = () => authStore(userNameSelector)
export const setUserName = (userName: string) => authStore.setState({userName})
const passwordSelector = (state: AuthStore) => state.password
export const usePassword = () => authStore(passwordSelector)
export const setPassword = (password: string) => authStore.setState({password})
const loginErrorTextSelector = (state: AuthStore) => state.loginErrorText
export const useLoginErrorText = () => authStore(loginErrorTextSelector)
export const submitLogin = async () => {
  const username = authStore.getState().userName;
  const password = authStore.getState().password;
  //如果用户名或密码为空，则直接返回
  if (!username || !password) {
    authStore.setState({loginErrorText: "用户名或密码不能为空"})
    return
  }
  try {
    const res = await login(username, password);
    if (isResponseError(res)) {
      authStore.setState({loginErrorText: "用户名或密码错误"})
    } else {
      setToken(res.accessToken, res.refreshToken)
      authStore.setState({loginLayerOpened: false, loginSuccess: true, loginErrorText: ""})
    }
  } catch (e) {
    authStore.setState({loginErrorText: "无法连接到服务器"})
  }
}

fetra.beforeResponse(async (response, input, init, fetcher) => {
  if (response.status === 401 && !isLoginUrl(getUrlByInput(input))) {
    if (getRefreshToken()) {
      const refreshResponse = await fetcher("/auth/refresh", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({refreshToken: getRefreshToken()})
      })
      if (refreshResponse.status === 200) {
        const data = await refreshResponse.json()
        if (!data.error) {
          setToken(data.accessToken, data.refreshToken)
          return fetcher(input, init)
        }
      }
    }
    authStore.setState({loginLayerOpened: true, loginSuccess: false})
    return new Promise<Response>(resolve => {
      const unsubscribe = authStore.subscribe((state) => {
        if (state.loginSuccess) {
          resolve(fetcher(input, init))
          unsubscribe()
        }
      });
    })
  }
  return response
})
