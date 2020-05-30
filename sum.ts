import curryN from "./utils/curry_n.ts"
import { Curry1 } from "./utils/types.ts"

function sum(list: Array<number>){
    return list.reduce((a, b) => a + b, 0)
}

/** Adds together all the elements of a list.
 * @function */
export default curryN(1, sum) as Curry1<number[], number>
