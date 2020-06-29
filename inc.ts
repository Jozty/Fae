import curryN from "./utils/curry_n.ts"
import { PH } from "./utils/types.ts"

// @types
type Inc = ((element: number) => number)
  & ((fnelement?: PH) => Inc)

function _inc(element: number){
    return ++element
}

/**
 * Increases its argument by 1.
 */
export const inc: Inc = curryN(1, _inc)
