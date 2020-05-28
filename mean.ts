import curryN from "./utils/curry_n.ts"
import { Curry1 } from "./utils/types.ts"
import sum from "./sum.ts"

/** Returns the mean of the given list of numbers. */
function mean(list: Array<number>) {
    return sum(list) / list.length
}

export default curryN(1, mean) as Curry1<Array<number>, number>
