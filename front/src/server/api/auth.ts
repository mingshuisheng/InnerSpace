import {BuildApiParams} from "@/utils/NetworkUtils";
import {Token} from "./TokenManager";

export type AuthApiType = {
  login: (username: string, password: string) => Promise<Required<Token> | {error: string}>
}

export const authApi: BuildApiParams<AuthApiType> = {
  login: fetra => (username, password) => fetra.post<Required<Token> | {error: string}>("/auth/login", {username, password}),
}
