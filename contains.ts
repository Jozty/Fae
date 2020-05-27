/* Returns True or false based on the element found or not. */
import curryN from "./utils/curry_n.ts"
import { Curry2 } from "./utils/types.ts"

function contains(element: any, list: ArrayLike<any>){
    let arr = Array.from(list)
    let index = 0
    while(index != arr.length){
        if(arr[index] === element) return true
        index++
    }
    return false
}

export default <Curry2<any, ArrayLike<any>, boolean>>curryN(2, contains)
