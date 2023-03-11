export type ResponseError = {
  message: string,
  statusCode: number
}

export const isResponseError = (response: any): response is ResponseError => {
  return response && response.message && response.statusCode
}
