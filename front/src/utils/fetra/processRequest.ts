import {Fetcher, FetraRequestIntercept, InputProcessor, RequestIntercept} from "@/utils/fetra/types";

export function processRequest(inputProcessor: InputProcessor, fetcher: Fetcher) {
  //处理请求拦截
  const requestInterceptSet = new Set<RequestIntercept>()
  const requestInterceptor: FetraRequestIntercept = {
    beforeRequest: (intercept: RequestIntercept) => requestInterceptSet.add(intercept),
    removeRequestIntercept: (intercept: RequestIntercept) => requestInterceptSet.delete(intercept)
  }
  let fetraRequest: Fetcher = async (input, init) => {
    input = inputProcessor(input)
    //请求请求拦截器开始处理
    //用迭代器的方式遍历请求拦截器集合，如果有拦截器返回了Response对象，则直接停止遍历
    let response: Response | null = null;
    let requestInterceptIterator = requestInterceptSet.values()
    for (let it = requestInterceptIterator.next(); !it.done; it = requestInterceptIterator.next()) {
      let result = await it.value(input, init || {}, fetcher)
      if (result instanceof Response) {
        response = result
        break
      } else {
        input = result[0]
        init = result[1]
      }
    }

    //如果response是null，则说明没有拦截器拦截请求，需要使用fetch发送请求
    return response ? response : await fetcher(input, init);
  }
  return {requestInterceptor, fetraRequest};
}
