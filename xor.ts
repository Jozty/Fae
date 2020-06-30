import curryN from "./utils/curry_n.ts"
import { PH } from "./utils/types.ts"

// @types
type Xor_2 = ((b: any) => boolean)
  & ((b?: PH) => Xor_2)

type Xor_1 = ((a: any) => boolean)
  & ((a?: PH) => Xor_1)

type Xor = ((a: any, b: any) => boolean)
  & ((a: any, b?: PH) => Xor_2)
  & ((a: PH, b: any) => Xor_1)
  & ((a?: PH, b?: PH) => Xor)

function _xor(a: any, b: any) {
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
export const xor: Xor = curryN(2, _xor)
