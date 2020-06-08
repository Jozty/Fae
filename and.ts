import curryN from "./utils/curry_n.ts"
import { Curry2 } from "./utils/types.ts"

function _and(a: any, b: any) {
  return a && b
}

export const and: Curry2<any> = curryN(2, _and)