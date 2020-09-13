import curryN from "./utils/curry_n.ts"
import type { Curry2, Func } from "./utils/types.ts"
import { reduce } from "./reduce.ts"
import { concat } from "./concat.ts"
import { map } from "./map.ts"

// TODO(ch-shubham) write documentation and test it
function _chain(fun: Func, list: ArrayLike<any>) {
    // @ts-ignore
    return reduce(concat, [], map(fun, list))
}

export const chain: Curry2<Func, ArrayLike<any>, boolean> = curryN(2, _chain)