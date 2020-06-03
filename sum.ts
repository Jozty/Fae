import curryN from "./utils/curry_n.ts"
import { Curry1 } from "./utils/types.ts"

function _sum(list: Array<number>){
    return list.reduce((a, b) => a + b, 0)
}

/** Adds together all the elements of a list. */
export const sum: Curry1<number[], number> = curryN(1, _sum)
