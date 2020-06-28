import curryN from "./utils/curry_n.ts"
import { PH } from "./utils/types.ts"

// @types
type And_2<T1> = (<T2>(b: T2) => T1 | T2)
  & ((b?: PH) => And_2<T1>)

type And_1<T2> = (<T1>(a: T1) => T1 | T2)
  & ((a?: PH) => And_1<T2>)

type And = (<T1, T2>(a: T1, b: T2) => T1 | T2)
  & (<T1>(a: T1, b?: PH) => And_2<T1>)
  & (<T2>(a: PH, b: T2) => And_1<T2>)
  & ((a?: PH, b?: PH) => And)


function _and<T1, T2>(a: T1, b: T2): T2 | T1 {
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
export const and: And = curryN(2, _and)