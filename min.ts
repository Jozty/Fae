import curryN from "./utils/curry_n.ts"
import { Curry2 } from "./utils/types.ts"

function _min(a: number | string, b: number | string){
    return a < b ? a : b
}

/**
 * Returns the smaller of its two arguments.
 */
export const min: Curry2<number | string, number | string, number | string> = curryN(2, _min)
