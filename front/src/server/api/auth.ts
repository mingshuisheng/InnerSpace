import {BuildApiParams} from "@/utils/NetworkUtils";
import {Token} from "./TokenManager";
import {ResponseError} from "@/server/api/ResponseError";


export type LoginResponse = Required<Token> | ResponseError

export type CheckTokenResponse = { isValid: boolean } | ResponseError

export type ChangePasswordResponse = {
  success: boolean,
  error: string
}

export type AuthApiType = {
  login: (username: string, password: string) => Promise<LoginResponse>
  checkToken: (token: string) => Promise<CheckTokenResponse>
  changePassword: (oldPassword: string, newPassword: string) => Promise<ChangePasswordResponse>
}

export const loginUrl = "/auth/login"

export const authApi: BuildApiParams<AuthApiType> = {
  login: fetra => (username, password) => fetra.post<LoginResponse>(loginUrl, {username, password}),
  checkToken: fetra => token => fetra.post<CheckTokenResponse>("/auth/checkToken", {token}),
  changePassword: fetra => (oldPassword, newPassword) => fetra.post<ChangePasswordResponse>("/auth/changePassword", {oldPassword, newPassword})
}
