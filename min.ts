import curryN from "./utils/curry_n.ts"
import { Curry } from "./utils/types.ts"

function _min(a: number | string, b: number | string){
    return a < b ? a : b
}

/**
 * Returns the smaller of its two arguments.
 */
export const min: Curry<typeof _min> = curryN(2, _min)
