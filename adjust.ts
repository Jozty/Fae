import { Func, Curry3 } from "./utils/types.ts"
import curryN from "./utils/curry_n.ts"

function adjust<T>(index: number, fn: Func, list: T[]) {
  const result = [...list]
  const len = result.length
  if(index >= len || index < -len) return result
  index = index < 0 ? len + index : index
  result[index] = fn(list[index])
  return result
}

/** Applies a given function `fn` at given `index` of `list`,
 * returning a new copy of `list` with element at `index` replaced with 
 * return value of `fn`.
 * @function
 * 
 *      Fae.adjust(2, Fae.add(1), [0, 1, 2, 3]) // [0, 1, 3, 3]
 *      Fae.adjust(-3, Fae.add(1), [0, 1, 2, 3]) // [0, 2, 2, 3]
*/
export default curryN(3, adjust) as Curry3<number, Func, any[], any[]>
