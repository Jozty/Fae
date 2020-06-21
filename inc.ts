import curryN from "./utils/curry_n.ts"
import { Curry } from "./utils/types.ts"

function _inc(element: number){
    return ++element
}

/**
 * Increases its argument by 1.
 */
export const inc: Curry<typeof _inc> = curryN(1, _inc)
