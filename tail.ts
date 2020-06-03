import curryN from "./utils/curry_n.ts"
import { Curry1 } from "./utils/types.ts"
import { slice } from "./slice.ts"

function _tail<T>(functor: ArrayLike<T> | string) {
  return slice(1, Infinity, functor)
}


/**
 * Returns all but the first element of `functor`.
 * Accepts array-like(including string).
 */
export const tail: Curry1<ArrayLike<any> | string> = curryN(1, _tail)
