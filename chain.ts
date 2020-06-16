import curryN from "./utils/curry_n.ts"
import { Curry, Func } from "./utils/types.ts"
import { reduce } from "./reduce.ts"
import { concat } from "./concat.ts"
import { map } from "./map.ts"

// TODO(ch-shubham) write documentation and test it
function _chain(fun: Func, list: ArrayLike<any>) {
    return reduce(concat, [], map(fun, list) as ArrayLike<any>)
}

export const chain: Curry<typeof _chain> = curryN(2, _chain)