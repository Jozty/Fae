import curryN from "./utils/curry_n.ts"
import { Curry2, Func } from "./utils/types.ts"


function all(fun: Func, list: ArrayLike<any>){
    let index = 0
    while(index < list.length){
        if(!fun(list[index])){
            return false
        }
        index++
    }
    return true
}

export default <Curry2<Func, ArrayLike<any>, boolean>>curryN(2, all)
