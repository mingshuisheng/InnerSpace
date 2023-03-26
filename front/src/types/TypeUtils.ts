type MyParameters<T extends Function> = T extends (...args: infer P) => any ? P : never;

export type WrapFunction<T extends Record<string, Function>, T2 extends Function> = {
  [K in keyof T]: T[K] extends (...arg: infer P) => infer R ? (...arg2: MyParameters<T2>) => (...arg: P) => R : T[K];
}

export type UnwrapFunction<T extends Record<string, Function>> = {
  [K in keyof T]: T[K] extends (...arg: infer P) => infer R ? R : T[K];
}
