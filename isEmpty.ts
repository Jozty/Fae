import curryN from './utils/curry_n.ts'
import { empty } from './empty.ts'
import { equals } from './equals.ts'

// @types
type IsEmpty = <T>(x: T) => boolean

function _isEmpty<T>(x: T) {
  return x != null && equals(x, empty(x))
}

/**
 * Returns `true` if the given value is its type's empty value, `false`
 * otherwise.
 *
 *      Fae.isEmpty([1, 2, 3])   //=> false
 *      Fae.isEmpty([])          //=> true
 *      Fae.isEmpty('')          //=> true
 *      Fae.isEmpty(null)        //=> false
 *      Fae.isEmpty({})          //=> true
 */
export const isEmpty: IsEmpty = curryN(1, _isEmpty)
