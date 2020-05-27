import curryN from "./utils/curry_n.ts"
import { Curry1 } from "./utils/types.ts"

function identity<T = any>(x: T) {
  return x
}

export default curryN(1, identity) as Curry1<any>
