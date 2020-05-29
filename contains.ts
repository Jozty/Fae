import curryN from "./utils/curry_n.ts"
import { Curry2 } from "./utils/types.ts"

// TODO: write transformer

/**Returns `true` or `false` based on the element found or not. */
function contains<T>(element: T, list: ArrayLike<T>){
    let index = 0
    while(index != list.length){
        if(list[index] === element) return true
        index++
    }
    return false
}

export default curryN(2, contains) as Curry2<any, ArrayLike<any>, boolean>
