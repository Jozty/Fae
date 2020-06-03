import { adjust } from "./adjust.ts"
import { always } from "./always.ts"
import curryN from "./utils/curry_n.ts"
import { Curry3 } from "./utils/types.ts"

function _update<T>(index: number, value: T, list: T[]) {
  return adjust(index, always(value), list)
}


/**
 * Returns a new array with copy of `list` and `value` replaced at `index`.
 * 
 * 
 *      Fae.adjust(2, Fae.add(1), [0, 1, 2, 3]) // [0, 1, 3, 3]
 *      Fae.adjust(-3, Fae.add(1), [0, 1, 2, 3]) // [0, 2, 2, 3]
 */
export const update: Curry3<number, any, any[], any[]> = curryN(3, _update)
