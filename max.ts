import curryN from './utils/curry_n.ts'
import type { PH } from './utils/types.ts'

// @types
// prettier-ignore
type Max_2<T extends number | string | Date> = ((b: T) => T)
  & ((b?: PH) => Max_2<T>)

// prettier-ignore
type Max_1<T extends number | string | Date> = ((a: T) => T)
  & ((a?: PH) => Max_1<T>)

// prettier-ignore  
type Max = (<T extends number | string | Date>(a: T, b: T) => T)
  & (<T extends number | string | Date>(a: T, b?: PH) => Max_2<T>)
  & (<T extends number | string | Date>(a: PH, b: T) => Max_1<T>)
  & ((a?: PH, b?: PH) => Max)

function _max<T extends number | string | Date>(a: T, b: T) {
  return a > b ? a : b
}

/**
 * Returns the larger of its two arguments.
 *
 * NaN > 1000  // false
 *
 *      Fae.max(1, 2)  // => 2
 *      Fae.max('abd', 'abc')  // => 'abd'
 *      Fae.max(1000, NaN)  // => 1000
 */
export const max: Max = curryN(2, _max)
