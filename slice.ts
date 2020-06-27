import curryN from './utils/curry_n.ts'
import { Curry } from './utils/types.ts'
import { isString } from './utils/is.ts'

function _slice<T>(fromIndex: number, toIndex: number, list: ArrayLike<T> | string) {
  if(isString(list)) return list.slice(fromIndex, toIndex)
  return Array.prototype.slice.call(list, fromIndex, toIndex)
}

/** Returns the elements of the given list or string `fromIndex` (inclusive) to `toIndex` (exclusive). */
export const slice: Curry<typeof _slice> = curryN(3, _slice)
