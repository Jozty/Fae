import curryN from "./utils/curry_n.ts"
import { Curry1 } from "./utils/types.ts"
import { add } from './add.ts'
import { sort } from "./sort.ts"
import { comparator } from "./comparator.ts"

function _median(list: Array<number>){
    let lCheck = list.length % 2 
    if(list.length === 0) return NaN
    let sList: number[] = sort(comparator((a, b) => a < b), list) 
    if(lCheck === 1) return sList[Math.trunc(list.length / 2)]
    return add(sList[list.length / 2], sList[list.length / 2 - 1]) / 2 
}

/**
 * Returns the median of the given list of numbers.
 *  */
export const median: Curry1<Array<number>, number> = curryN(1, _median)
