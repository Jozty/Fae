import { equals } from "./equals.ts"
import { takeLast } from "./takeLast.ts"
import curryN from "./utils/curry_n.ts"
import type { PH } from "./utils/types.ts"

// @types
type EndsWith_2<L extends T[] | string, T> = ((functor: L) => boolean)
  & ((functor?: PH) => EndsWith_2<L, T>)

type EndsWith_1<L extends T[] | string, T> = ((suffix: L) => boolean)
  & ((suffix?: PH) => EndsWith_1<L, T>)

type EndsWith = (<L extends T[] | string, T>(suffix: L, functor: L) => boolean)
  & (<L extends T[] | string, T>(suffix: L, functor?: PH) => EndsWith_2<L, T>)
  & (<L extends T[] | string, T>(suffix: PH, functor: L) => EndsWith_1<L, T>)
  & ((suffix?: PH, functor?: PH) => EndsWith)

function _endsWith<L extends T[] | string, T>(suffix: L, functor: L) {
  const suffixF = takeLast(suffix.length, functor)
  return equals(suffix, suffixF)
}

/**
 * checks if `functor` ends with `suffix`
 * 
 *      Fae.endsWith('c', 'abc')                //=> true
 *      Fae.endsWith('b', 'abc')                //=> false
 *      Fae.endsWith(['c'], ['a', 'b', 'c'])    //=> true
 *      Fae.endsWith(['b'], ['a', 'b', 'c'])    //=> false
 * 
 */
export const endsWith: EndsWith = curryN(2, _endsWith)
