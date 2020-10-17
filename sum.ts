import curryN from './utils/curry_n.ts'
import type { PH } from './utils/types.ts'

// @types
type Sum = (list: number[]) => number

function _sum(list: number[]): number {
  return list.reduce((a, b) => a + b, 0)
}

/** Adds together all the elements of a list. */
export const sum: Sum = curryN(1, _sum)
