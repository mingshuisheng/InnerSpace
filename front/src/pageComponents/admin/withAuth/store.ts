import {create} from 'zustand'
import {api, fetra, isLoginUrl} from "@/server/api";
import {getUrlByInput} from "@/utils/NetworkUtils";
import {isResponseError} from "@/server/api/ResponseError";
import {ChangeEvent, FormEvent, useCallback} from "react";

const {login} = api

interface AuthStore {
  loginLayerOpened: boolean
  userName: string
  password: string
  loginSuccess: boolean
  loginErrorText: string
}

const authStore = create<AuthStore>(() => ({
  loginLayerOpened: false,
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
      authStore.setState({loginLayerOpened: false, loginSuccess: true, loginErrorText: "", userName: "", password: ""})
    }
  } catch (e) {
    authStore.setState({loginErrorText: "无法连接到服务器"})
  }
}

export const checkLoginStatus = async () => {
  const result = await api.checkToken();
  if(result.isValid){
    authStore.setState({loginSuccess: true, loginLayerOpened: false})
  }else {
    authStore.setState({loginSuccess: false, loginLayerOpened: true})
  }
}


export const handleUserNameChange = (e: ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)
export const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)
export const handleInput = (e: FormEvent<HTMLInputElement>) => {
  //如果是回车键，就提交表单
  if (e.nativeEvent instanceof KeyboardEvent && e.nativeEvent.key === 'Enter') {
    e.preventDefault()
    submitLogin().then()
  }
}

//设置fetra的beforeResponse钩子，用于处理401错误，实现token自动刷新
fetra.beforeResponse(async (response, input, init, fetcher) => {
  if (response.status === 401 && !isLoginUrl(getUrlByInput(input))) {
    //尝试刷新token,然后重新发起请求
    const refreshResponse = await fetcher("/auth/refresh", {method: "POST"})
    if (refreshResponse.status === 200) {
      const data = await refreshResponse.json()
      if (!data.error) {
        return fetcher(input, init)
      }
    }
    //如果刷新token失败，则打开登录界面，登录成功后重新发起请求
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
