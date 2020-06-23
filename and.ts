import curryN from "./utils/curry_n.ts"
import { Curry } from "./utils/types.ts"

function _and<T1, T2>(a: T1, b: T2) {
  return a && b
}

/**
 * Returns `true` if both arguments are `true`, `false` otherwise.
 * 
 *      Fae.and(true, true)   //=> true
 *      Fae.and(true, false)  //=> false
 *      Fae.and(false, true)  //=> false
 *      Fae.and(false, false) //=> false
 */
export const and: Curry<typeof _and> = curryN(2, _and)