/*
** Works on List/Array
** Adds the given element to the array at given index
** Return the new copy of array without affecting original one.
*/
import curryN from "./utils/curry_n.ts"
import { Curry3 } from "./utils/types.ts"

function insert(index: number, element: any, list: ArrayLike<any>){
    index = index < list.length && index >= 0 ? index : list.length
    let result = Array.from(list)
    result.splice(index, 0, element)
    return result
}


export default <Curry3<number, any, Array<any>, Array<number>>>curryN(3, insert)
