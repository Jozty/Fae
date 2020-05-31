import adjust from "./adjust.ts"
import always from "./always.ts"
import curryN from "./utils/curry_n.ts"
import { Curry3 } from "./utils/types.ts"

function update<T>(index: number, value: T, list: T[]) {
  return adjust(index, always(value), list)
}


/** Returns a new array with copy of `list` and `value` replaced at `index`.
 * @function
 * 
 *      Fae.adjust(2, Fae.add(1), [0, 1, 2, 3]) // [0, 1, 3, 3]
 *      Fae.adjust(-3, Fae.add(1), [0, 1, 2, 3]) // [0, 2, 2, 3]
*/
export default curryN(3, update) as Curry3<number, any, any[], any[]>
