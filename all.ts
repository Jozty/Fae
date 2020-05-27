import curryN from "./utils/curry_n.ts"
import { Curry2, Func } from "./utils/types.ts"


function all(fun: Func, list: ArrayLike<any>){
    let arrList = Array.from(list)
    let index = 0
    while(index < arrList.length){
        if(!fun(arrList[index])){
            return false
        }
        index += 1
    }
    return true
}

export default <Curry2<Func, ArrayLike<any>, boolean>>curryN(2, all)
