import { equals } from "./equals.ts"
import { takeLast } from "./takeLast.ts"
import curryN from "./utils/curry_n.ts"
import { Curry } from "./utils/types.ts"

function _endsWith<T>(suffix: T[] | string, functor: T[] | string) {
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
export const endsWith: Curry<typeof _endsWith> = curryN(2, _endsWith)
