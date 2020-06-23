import { Func, Curry } from "./utils/types.ts"
import curryN from "./utils/curry_n.ts"

function _adjust<T>(index: number, fn: Func, list: T[]) {
  const result = [...list]
  const len = result.length
  if(index >= len || index < -len) return result
  index = index < 0 ? len + index : index
  result[index] = fn(list[index])
  return result
}

/**
 * Applies a given function `fn` at given `index` of `list`,
 * returning a new copy of `list` with element at `index` replaced with 
 * return value of `fn`.
 * 
 *      Fae.adjust(2, Fae.add(1), [0, 1, 2, 3]) // [0, 1, 3, 3]
 *      Fae.adjust(-3, Fae.add(1), [0, 1, 2, 3]) // [0, 2, 2, 3]
 */
export const adjust: Curry<typeof _adjust> =  curryN(3, _adjust)
