import curryN from "./utils/curry_n.ts"

export default curryN(2, function append<T>(el: T, list: T[]) {
  return [...list, el]
})