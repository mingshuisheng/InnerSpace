import {BuildApiParams} from "@/utils/NetworkUtils";
import {Token} from "./TokenManager";
import {ResponseError} from "@/server/api/ResponseError";



export type LoginResponse = Required<Token> | ResponseError

export type AuthApiType = {
  login: (username: string, password: string) => Promise<LoginResponse>
}

export const loginUrl = "/auth/login"

export const authApi: BuildApiParams<AuthApiType> = {
  login: fetra => (username, password) => fetra.post<LoginResponse>(loginUrl, {username, password}),
}
