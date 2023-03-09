import {Fetcher, FetraRestful} from "@/utils/fetra/types";

export function processRestful(fetra: Fetcher): FetraRestful {
  return {
    get: (input: RequestInfo | URL, init: RequestInit = {}) => {
      return fetra(input, {...init, method: "GET"})
    },
    post: (input: RequestInfo | URL, init: RequestInit = {}) => {
      return fetra(input, {...init, method: "POST"})
    },
    put: (input: RequestInfo | URL, init: RequestInit = {}) => {
      return fetra(input, {...init, method: "PUT"})
    },
    delete: (input: RequestInfo | URL, init: RequestInit = {}) => {
      return fetra(input, {...init, method: "DELETE"})
    },
    patch: (input: RequestInfo | URL, init: RequestInit = {}) => {
      return fetra(input, {...init, method: "PATCH"})
    }
  };
}
