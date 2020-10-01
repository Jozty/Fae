import curryN from './utils/curry_n.ts'
import type { PH } from './utils/types.ts'

// @types
type Divide_2 = (b: number) => number

type Divide_1 = (a: number) => number

// prettier-ignore
type Divide =
  & ((a: number, b?: PH) => Divide_2)
  & ((a: PH, b: number) => Divide_1)
  & ((a: number, b: number) => number)

function _divide(a: number, b: number) {
  return a / b
}

/**
 * Divides two numbers. Equivalent to `a / b`.
 */
export const divide: Divide = curryN(2, _divide)
