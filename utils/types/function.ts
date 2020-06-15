export interface Function<P extends any[] = any, R extends any = any> {
  (...args: P): R
}
