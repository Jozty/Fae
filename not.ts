import curryN from "./utils/curry_n.ts"
import { Curry } from "./utils/types.ts"

function _not<T>(a: T){
  return !a;
}

export const not: Curry<typeof _not> = curryN(1, _not)
