import curryN from './utils/curry_n.ts'
import type { PH } from './utils/types.ts'

// @types
type Min_2<T extends number | string | Date> = ((b: T) => T) &
  ((b?: PH) => Min_2<T>)

type Min_1<T extends number | string | Date> = ((a: T) => T) &
  ((a?: PH) => Min_1<T>)

type Min = (<T extends number | string | Date>(a: T, b: T) => T) &
  (<T extends number | string | Date>(a: T, b?: PH) => Min_2<T>) &
  (<T extends number | string | Date>(a: PH, b: T) => Min_1<T>) &
  ((a?: PH, b?: PH) => Min)

function _min(a: number | string, b: number | string) {
  return a < b ? a : b
}

/**
 * Returns the smaller of its two arguments.
 */
export const min: Min = curryN(2, _min)
