export type InputProcessor = (input: RequestInfo | URL) => RequestInfo | URL
export type Fetcher = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>
export type RequestIntercept = (input: RequestInfo | URL, init: RequestInit, fetcher: Fetcher) => Promise<[RequestInfo | URL, RequestInit] | Response>
export type ResponseIntercept = (response: Response, input: RequestInfo | URL, init: RequestInit, fetcher: Fetcher) => Promise<Response>
export type ErrorIntercept = (error: unknown, input: RequestInfo | URL, init: RequestInit, response: Response | null, fetcher: Fetcher) => Promise<Response | null>

export type FetraRequestIntercept = {
  beforeRequest: (intercept: RequestIntercept) => void
  removeRequestIntercept: (intercept: RequestIntercept) => void
}

export type FetraResponseIntercept = {
  beforeResponse: (intercept: ResponseIntercept) => void
  removeResponseIntercept: (intercept: ResponseIntercept) => void
}

export type FetraErrorIntercept = {
  beforeError: (intercept: ErrorIntercept) => void
  removeErrorIntercept: (intercept: ErrorIntercept) => void
}

export type FetraRestful = {
  get: Fetcher
  post: Fetcher
  put: Fetcher
  delete: Fetcher
  patch: Fetcher
  origin: Fetcher
}

export type Fetra = FetraRestful & FetraRequestIntercept & FetraResponseIntercept & FetraErrorIntercept
