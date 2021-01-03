// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import curryN from './utils/curry_n.ts'
import type { PH } from './utils/types.ts'

// @types
type Max_2<T extends number | string | Date> = (b: T) => T

type Max_1<T extends number | string | Date> = (a: T) => T

// prettier-ignore
type _Max<T extends number | string | Date> =
  & ((a: T, b?: PH) => Max_2<T>)
  & ((a: PH, b: T) => Max_1<T>)
  & ((a: T, b: T) => T)

type Max = _Max<number> & _Max<string> & _Max<Date>

function _max<T extends number | string | Date>(a: T, b: T) {
  return a > b ? a : b
}

/**
 * Returns the larger of its two arguments.
 *      Fae.max(1, 2)  // => 2
 *      Fae.max('abd', 'abc')  // => 'abd'
 *      Fae.max(1000, NaN)  // => NaN
 */
export const max: Max = curryN(2, _max)
