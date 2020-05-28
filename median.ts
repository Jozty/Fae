import curryN from "./utils/curry_n.ts"
import { Curry1 } from "./utils/types.ts"
import add from './add.ts'
import sort from "./sort.ts"
function median(list: Array<number>){
    let lCheck = list.length % 2 
    if(list.length === 0) return NaN
    let sList: number[] = sort((a: number, b: number) => a - b, list) 
    if(lCheck === 1) return sList[Math.trunc(list.length / 2)]
    return add(sList[list.length / 2], sList[list.length / 2 - 1]) / 2 
}

export default <Curry1<Array<number>, number>>curryN(1, median)
