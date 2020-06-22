import curryN from "./utils/curry_n.ts"
import { Curry } from "./utils/types.ts"
import { sum } from "./sum.ts"

function _mean(list: Array<number>) {
    return sum(list) / list.length
}

/**
 * Returns the mean of the given list of numbers.
 */
export const mean: Curry<typeof _mean> = curryN(1, _mean)
