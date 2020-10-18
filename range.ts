import curryN from './utils/curry_n.ts'
import { isInteger } from './utils/is.ts'
import type { PH } from './utils/types.ts'

// @types
type Range_2 = (to: number) => number[]

type Range_1 = (from: number) => number[]

// prettier-ignore
type Range =
  & ((from: number, to?: PH) => Range_2)
  & ((from: PH, to: number) => Range_1)
  & ((from: number, to: number) => number[])

function _range(from: number, to: number) {
  if (
    isNaN(from) ||
    isNaN(to) ||
    !isInteger(from) ||
    !isInteger(to)
  ) {
    throw new Error(
      `The arguments should be finite integer values but got\n\tfrom: ${from}\n\tto: ${to}`,
    )
  }

  const result = []
  const l = to - from + 1
  if (l <= 0) return []
  result.length = l
  for (let i = 0; i < l; i++) {
    result[i] = from++
  }
  return result
}

/** Returns a list of numbers from `from` to `to` **both inclusive**. */
export const range: Range = curryN(2, _range)
