// const baseUrl = "http://localhost:8080"
const baseUrl = "/api"

export const get = async <T = unknown>(url: string, params?: Record<string, any>, headers?: HeadersInit) => {
  let requestUrl = baseUrl + url
  if (params) {
    requestUrl += "?" + new URLSearchParams(Object.entries(params)).toString()
  }

  const response = await fetch(requestUrl, {headers});
  const data = await response.json()
  return data as T
}

export const post = async <T = unknown>(url: string, param?: Record<string, any>, headers?: HeadersInit) => {
  const init: RequestInit = {
    method: "post",
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  }
  if (param) {
    init.body = JSON.stringify(param)
  }
  const response = await fetch(baseUrl + url, init);
  const data = response.json()
  return data as T
}

export const put = async <T = unknown>(url: string, param?: Record<string, any>, headers?: HeadersInit) => {
  const init: RequestInit = {
    method: "put",
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  }
  if (param) {
    init.body = JSON.stringify(param)
  }
  const response = await fetch(baseUrl + url, init);
  const data = response.json()
  return data as T
}

export const del = async <T = unknown>(url: string, param?: Record<string, any>, headers?: HeadersInit) => {
  const init: RequestInit = {
    method: "delete",
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  }
  if (param) {
    init.body = JSON.stringify(param)
  }
  const response = await fetch(baseUrl + url, init);
  const data = response.json()
  return data as T
}
