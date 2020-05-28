import curryN from "./utils/curry_n.ts"
import { Curry1 } from "./utils/types.ts"
import sum from "./sum.ts"

function mean(list: Array<number>){
    return sum(list)/list.length
}

export default <Curry1<Array<number>, number>>curryN(1, mean)
