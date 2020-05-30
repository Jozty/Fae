import curryN from "./utils/curry_n.ts"
import { Curry1 } from "./utils/types.ts"
import slice from "./slice.ts"

function tail<T>(functor: ArrayLike<T> | string) {
  return slice(1, Infinity, functor)
}


/** Returns all but the first element of `functor`.
 * Accepts array-like(including string).
 * @function */
export default curryN(1, tail) as Curry1<Array<any> | string>
