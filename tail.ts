import curryN from "./utils/curry_n.ts"
import { Curry1 } from "./utils/types.ts"

function tail<T>(array: T[]) {
  return array.slice(1)
}

export default curryN(1, tail) as Curry1<Array<any>>
