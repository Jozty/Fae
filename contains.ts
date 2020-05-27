/* Returns True or false based on the element found or not. */
import curryN from "./utils/curry_n.ts"
import { Curry2 } from "./utils/types.ts"

function contains(element: any, list: ArrayLike<any>){
    let index = 0
    while(index != list.length){
        if(list[index] === element) return true
        index++
    }
    return false
}

export default <Curry2<any, ArrayLike<any>, boolean>>curryN(2, contains)
