import {Fetcher, FetraResponseIntercept, ResponseIntercept} from "@/utils/fetra/types";

export function processResponse(fetraRequest: Fetcher, fetcher: Fetcher) {
  //处理响应拦截
  const responseInterceptSet = new Set<ResponseIntercept>()
  const responseInterceptor: FetraResponseIntercept = {
    beforeResponse: (intercept: ResponseIntercept) => responseInterceptSet.add(intercept),
    removeResponseIntercept: (intercept: ResponseIntercept) => responseInterceptSet.delete(intercept)
  }
  const fetraResponse: Fetcher = async (input, init) => {
    let response = await fetraRequest(input, init);
    //用迭代器的方式遍历响应拦截器集合
    let responseInterceptIterator = responseInterceptSet.values()
    for (let it = responseInterceptIterator.next(); !it.done; it = responseInterceptIterator.next()) {
      response = await it.value(response, input, init || {}, fetcher)
    }
    return response
  }
  return {responseInterceptor, fetraResponse};
}
