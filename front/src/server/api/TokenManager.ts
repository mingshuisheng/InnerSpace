export type Token = { accessToken?: string, refreshToken?: string }

const token: Token = {}

export const setToken = (accessToken: string, refreshToken: string) => {
  token.accessToken = accessToken
  token.refreshToken = refreshToken
}

export const getAccessToken = () => token.accessToken
export const getRefreshToken = () => token.refreshToken
