import curryN from "./utils/curry_n.ts"
import { Curry1 } from "./utils/types.ts"

function _identity<T = any>(x: T) {
  return x
}

/**
 * Returns the supplied parameter
 */
export const identity: Curry1<any> = curryN(1, _identity)
