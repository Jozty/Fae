import curryN from "./utils/curry_n.ts"
import { PH } from "./utils/types.ts"
import { sum } from "./sum.ts"

// @types
type Mean = ((list: number[]) => number)
  & ((list?: PH) => Mean)

function _mean(list: number[]) {
    return sum(list) / list.length
}

/**
 * Returns the mean of the given list of numbers.
 */
export const mean: Mean = curryN(1, _mean)
