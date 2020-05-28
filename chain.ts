import curryN from "./utils/curry_n.ts"
import { Curry2, Func } from "./utils/types.ts"
import reduce from "./reduce.ts"
import concat from "./concat.ts"
import map from "./map.ts"

// TODO(ch-shubham) write documentation and test it
function chain(fun: Func, list: ArrayLike<any>) {
    return reduce(concat, [], map(fun, list))
}

export default curryN(2, chain) as Curry2<Func, ArrayLike<any>, boolean>