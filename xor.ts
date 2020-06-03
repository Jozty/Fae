import curryN from "./utils/curry_n.ts"
import { Curry2, Obj } from "./utils/types.ts"

function xor(a: any, b: any) {
  return Boolean(a ? !b : b)
}

/** Exclusive Or - Returns `true` if one of the arguments is truthy and the other is falsy.
 * Otherwise, it returns `false`.
 * 
 *      Fae.xor(true, true) //=> false
 *      Fae.xor(true, false) //=> true
 *      Fae.xor(false, true) //=> true
 *      Fae.xor(false, false) //=> false 
 */
export default curryN(2, xor) as Curry2<any, any, boolean>