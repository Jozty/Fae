import curryN from "./utils/curry_n.ts"
import type { PH } from "./utils/types.ts"

// @types
type Or_2<T1> = (<T2>(b: T2) => T1 | T2)
  & ((b?: PH) => Or_2<T1>)

type Or_1<T2> = (<T1>(a: T1) => T1 | T2)
  & ((a?: PH) => Or_1<T2>)

type Or = (<T1, T2>(a: T1, b: T2) => T1 | T2)
  & (<T1>(a: T1, b?: PH) => Or_2<T1>)
  & (<T2>(a: PH, b: T2) => Or_1<T2>)
  & ((a?: PH, b?: PH) => Or)

function _or<T1, T2>(a: T1, b: T2): T2 | T1 {
  return a || b
}

/**
 * Returns `true` if one or both of its arguments are `true`. Returns `false`
 * if both arguments are `false`.
 * 
 *      Fae.or(true, true)    //=> true
 *      Fae.or(true, false)   //=> true
 *      Fae.or(false, true)   //=> true
 *      Fae.or(false, false)  //=> false
 */
export const or: Or = curryN(2, _or)