import { slice } from './slice.ts'
import { dispatch } from './utils/dispatch.ts'
import TakeTransformer from './utils/Transformers/take.ts'
import curryN from './utils/curry_n.ts'
import { Curry2 } from './utils/types.ts'

function _take<T>(n: number, list: T[] | string) {
  return slice(0, n < 0 ? Infinity : n, list)
}

const dispatchedTake = dispatch(TakeTransformer as any, _take)

/**
 * Returns first `n` elements of the array or string.
 * 
 * Acts as a transducer if a transformer is given in `list`.
 */
export const take: Curry2<number, any[] | string, any[] | string> = curryN(2, dispatchedTake)
