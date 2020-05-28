import curryN from "./utils/curry_n.ts"
import { Curry1 } from "./utils/types.ts"

/** Adds together all the elements of a list. */
function sum(list: Array<number>){
    return list.reduce((a, b) => a + b, 0)
}

export default curryN(1, sum) as Curry1<number[], number>
