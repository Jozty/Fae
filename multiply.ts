import curryN from './utils/curry_n.ts'
import type { PH } from './utils/types.ts'

// @types
// prettier-ignore
type Multiply_2 = ((b: number) => number)
  & ((b?: PH) => Multiply_2)

// prettier-ignore
type Multiply_1 = ((a: number) => number)
  & ((a?: PH) => Multiply_1)

// prettier-ignore
type Multiply = ((a: number, b: number) => number)
  & ((a: number, b?: PH) => Multiply_2)
  & ((a: PH, b: number) => Multiply_1)
  & ((a?: PH, b?: PH) => Multiply)

function _multiply(a: number, b: number) {
  return a * b
}

/**
 * Multiplies two numbers. Equivalent to `a * b` but curried.
 */
export const multiply: Multiply = curryN(2, _multiply)
