import curryN from "./utils/curry_n.ts"
import { Curry } from "./utils/types.ts"

function _insert<T>(index: number, element: T, list: T[]) {
  index = index < list.length && index >= 0 ? index : list.length
  let result = Array.from(list)
  result.splice(index, 0, element)
  return result
}

/**
 * Returns a new array with `element` inserted at `index` to `list`
 * without affecting original one.
 */
export const insert: Curry<typeof _insert> = curryN(3, _insert)
