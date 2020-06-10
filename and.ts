import curryN from "./utils/curry_n.ts"
import { Curry2 } from "./utils/types.ts"

function _and(a: any, b: any) {
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
export const and: Curry2<any> = curryN(2, _and)