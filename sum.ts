import curryN from "./utils/curry_n.ts"
import { Curry } from "./utils/types.ts"

function _sum(list: Array<number>){
    return list.reduce((a, b) => a + b, 0)
}

/** Adds together all the elements of a list. */
export const sum: Curry<typeof _sum> = curryN(1, _sum)
