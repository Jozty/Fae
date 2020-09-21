import curryN from './utils/curry_n.ts'
import type { PH } from './utils/types.ts'

// @types
//
type And_2 = ((b: any) => boolean) & ((b?: PH) => And_2)

type And_1 = ((a: any) => boolean) & ((a?: PH) => And_1)

type And = ((a: any, b: any) => boolean) &
  ((a: any, b?: PH) => And_2) &
  ((a: PH, b: any) => And_1) &
  ((a?: PH, b?: PH) => And)

function _and(a: any, b: any) {
  return Boolean(!!a && !!b)
}

/**
 * Returns `true` if both arguments are `true`, `false` otherwise.
 *
 *      Fae.and(true, true)   //=> true
 *      Fae.and(true, false)  //=> false
 *      Fae.and(false, true)  //=> false
 *      Fae.and(false, false) //=> false
 */
export const and: And = curryN(2, _and)
