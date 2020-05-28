import curryN from "./utils/curry_n.ts"
import { Curry1 } from "./utils/types.ts"


function sum(list: Array<number>){
    let index = 0 , result = 0 
    while(index != list.length){
        result += list[index]
        index++
    }
    return result
}

export default <Curry1<Array<number>, number>>curryN(1, sum)
