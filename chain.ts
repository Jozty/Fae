import curryN from "./utils/curry_n.ts"
import { Curry2, Func } from "./utils/types.ts"
import reduce from "./reduce.ts"
import concat from "./utils/concat.ts"
import map from "./map.ts"

function chain(fun: Func, list: ArrayLike<any>){
    return reduce(concat, [], map(fun, list))
}

export default <Curry2<Func, ArrayLike<any>, boolean>>curryN(2, chain)