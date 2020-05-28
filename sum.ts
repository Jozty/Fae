import curryN from "./utils/curry_n.ts"
import { Curry1 } from "./utils/types.ts"
import reduce from './reduce.ts'

function sum(list: Array<number>){
    return list.reduce((a, b) => a + b, 0)
}

export default <Curry1<Array<number>, number>>curryN(1, sum)
