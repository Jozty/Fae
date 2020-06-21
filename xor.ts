import curryN from "./utils/curry_n.ts"
import { Curry } from "./utils/types.ts"

function _xor<T>(a: T, b: T) {
  return Boolean(a ? !b : b)
}

/**
 * Exclusive Or - Returns `true` if one of the arguments is truthy and the other is falsy.
 * Otherwise, it returns `false`.
 * 
 *      Fae.xor(true, true) //=> false
 *      Fae.xor(true, false) //=> true
 *      Fae.xor(false, true) //=> true
 *      Fae.xor(false, false) //=> false 
 */
export const xor: Curry<typeof _xor> = curryN(2, _xor)
