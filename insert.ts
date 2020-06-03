import curryN from "./utils/curry_n.ts"
import { Curry3 } from "./utils/types.ts"

function _insert(index: number, element: any, list: any[]) {
  index = index < list.length && index >= 0 ? index : list.length
  let result = Array.from(list)
  result.splice(index, 0, element)
  return result
}

/**
 * Returns a new array with `element` inserted at `index` to `list`
 * without affecting original one.
 */
export const insert: Curry3<number, any, any[], any[]> = curryN(3, _insert)
