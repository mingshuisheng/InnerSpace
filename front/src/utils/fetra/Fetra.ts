import type {Fetcher, Fetra, InputProcessor} from "@/utils/fetra/types";
import {processRequest} from "@/utils/fetra/processRequest";
import {processInput} from "@/utils/fetra/processInput";
import {processRestful} from "@/utils/fetra/processRestful";
import {processResponse} from "@/utils/fetra/processResponse";
import {processError} from "@/utils/fetra/processError";


export const newFetra = (baseUrl: string = "", fetcher: Fetcher = fetch): Fetra => {
  const inputProcessor: InputProcessor = (input) => processInput(baseUrl, input)
  const {requestInterceptor, fetraRequest} = processRequest(inputProcessor, fetcher);
  const {responseInterceptor, fetraResponse} = processResponse(fetraRequest, fetcher);
  const {errInterceptor, fetraError} = processError(fetraResponse, fetcher);
  return {
    ...processRestful(fetraError),
    ...requestInterceptor,
    ...responseInterceptor,
    ...errInterceptor
  }
}
