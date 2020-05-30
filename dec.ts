import curryN from "./utils/curry_n.ts"
import { Curry1 } from "./utils/types.ts"

function dec(element: number){
    return --element
}

/** Decreases its argument by 1.
 * @function */
export default curryN(1, dec) as Curry1<number>
