import curryN from "./utils/curry_n.ts"
import { Curry1 } from "./utils/types.ts"

function inc(element: number){
    return ++element
}

/** Increases its argument by 1.
 * @function */
export default curryN(1, inc) as Curry1<number>
