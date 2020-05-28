import curryN from "./utils/curry_n.ts"
import { Curry1 } from "./utils/types.ts"
import add from './add.ts'
function median(list: Array<number>){
    let lCheck = list.length % 2 
    if(list.length === 0) return NaN
    else if(lCheck === 1) return list[Math.trunc(list.length / 2)]
    else return add(list[list.length / 2], list[list.length / 2 - 1]) / 2 
}

export default <Curry1<Array<number>, number>>curryN(1, median)
