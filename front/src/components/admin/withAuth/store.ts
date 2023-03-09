import {create} from 'zustand'
import {api, fetra} from "@/server/api";
import {getRefreshToken, setToken, Token} from "@/server/api/TokenManager";

const {login} = api

interface AuthStore {
  loginLayerOpened: boolean
  userName: string
  password: string
  loginSuccess: boolean
  loginError: boolean
}

const authStore = create<AuthStore>(() => ({
  loginLayerOpened: true,
  userName: "",
  password: "",
  loginSuccess: false,
  loginError: false
}))

const loginLayerOpenedSelector = (state: AuthStore) => state.loginLayerOpened
export const useLoginLayerOpened = () => authStore(loginLayerOpenedSelector)
const userNameSelector = (state: AuthStore) => state.userName
export const useUserName = () => authStore(userNameSelector)
export const setUserName = (userName: string) => authStore.setState({userName})
const passwordSelector = (state: AuthStore) => state.password
export const usePassword = () => authStore(passwordSelector)
export const setPassword = (password: string) => authStore.setState({password})
// const loginSuccessSelector = (state: AuthStore) => state.loginSuccess
// export const useLoginSuccess = () => authStore(loginSuccessSelector)
const loginErrorSelector = (state: AuthStore) => state.loginError
export const useLoginError = () => authStore(loginErrorSelector)
export const submitLogin = async () => {
  const username = authStore.getState().userName;
  const password = authStore.getState().password;
  const res = await login(username, password);
  if (isTokenError(res)) {
    authStore.setState({loginError: true})
  } else {
    setToken(res.accessToken, res.refreshToken)
    authStore.setState({loginLayerOpened: false, loginSuccess: true, loginError: false})
  }
}

type TokenError = { error: string }

function isTokenError(resp: Required<Token> | { error: string }): resp is TokenError {
  return (resp as { error: string }).error !== undefined
}

fetra.beforeResponse(async (response, input, init, fetcher) => {
  if (response.status === 401) {
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
