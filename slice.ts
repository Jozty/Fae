import curryN from './utils/curry_n.ts'
import { Curry3 } from './utils/types.ts'
import { isString } from './utils/is.ts'

/**
 * Returns the elements of the given list or string `fromIndex` (inclusive) to `toIndex` (exclusive).
 */
function slice<T>(fromIndex: number, toIndex: number, list: ArrayLike<T> | string) {
  if(isString(list)) return list.slice(fromIndex, toIndex)
  return Array.prototype.slice.call(list, fromIndex, toIndex)
}

export default curryN(3, slice) as Curry3<number, number, ArrayLike<any> | string, ArrayLike<any> | string>
