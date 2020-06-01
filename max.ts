import curryN from "./utils/curry_n.ts"
import { Curry2 } from "./utils/types.ts"

function max(a: number | string | Date, b: number | string | Date) {
    return a > b ? a : b
}
/** Returns the larger of its two arguments.
 * @function
 * NaN > 1000  // false
 *      Fae.max(1000, NaN)  // => 1000
 * */
export default curryN(2, max) as Curry2<number | string | Date, number | string | Date, number | string | Date>
