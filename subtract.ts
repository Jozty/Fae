import curryN from './utils/curry_n.ts'
import type { PH } from './utils/types.ts'

// @types
type Subtract_2 = ((b: number) => number) & ((b?: PH) => Subtract_2)

type Subtract_1 = ((a: number) => number) & ((a?: PH) => Subtract_1)

type Subtract = ((a: number, b: number) => number) &
  ((a: number, b?: PH) => Subtract_2) &
  ((a: PH, b: number) => Subtract_1) &
  ((a?: PH, b?: PH) => Subtract)

function _subtract(a: number, b: number) {
  return a - b
}

/** Subtracts its second argument from its first argument. */
export const subtract: Subtract = curryN(2, _subtract)
