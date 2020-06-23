import curryN from "./utils/curry_n.ts"
import { Curry } from "./utils/types.ts"

function _dec(element: number){
    return --element
}

/**
 * Decreases its argument by 1.
 */
export const dec: Curry<typeof _dec> = curryN(1, _dec)
