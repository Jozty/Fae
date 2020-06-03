import curryN from './utils/curry_n.ts'
import { Curry3 } from './utils/types.ts'
import { isString } from './utils/is.ts'

function _slice<T>(fromIndex: number, toIndex: number, list: ArrayLike<T> | string) {
  if(isString(list)) return list.slice(fromIndex, toIndex)
  return Array.prototype.slice.call(list, fromIndex, toIndex)
}

/** Returns the elements of the given list or string `fromIndex` (inclusive) to `toIndex` (exclusive). */
export const slice: Curry3<number, number, ArrayLike<any> | string, ArrayLike<any> | string> = curryN(3, _slice)
