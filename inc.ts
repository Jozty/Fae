import curryN from "./utils/curry_n.ts"
import { Curry1 } from "./utils/types.ts"

function _inc(element: number){
    return ++element
}

/**
 * Increases its argument by 1.
 */
export const inc: Curry1<number> = curryN(1, _inc)
