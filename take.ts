import { slice } from './slice.ts'
import { dispatch } from './utils/dispatch.ts'
import TakeTransformer from './utils/Transformers/take.ts'
import curryN from './utils/curry_n.ts'
import type { PH } from './utils/types.ts'

// @types
type Take_2 = (<L extends ArrayLike<T> | string, T>(list: L) => L)
  & ((list?: PH) => Take_2)

type Take_1<L extends ArrayLike<T> | string, T> = ((n: number) => L)
  & ((n?: PH) => Take_1<L, T>)

type Take = (<L extends ArrayLike<T> | string, T>(n: number, list: L) => L)
  & ((n: number, list?: PH) => Take_2)
  & (<L extends ArrayLike<T> | string, T>(n: PH, list: L) => Take_1<L, T>)
  & ((n?: PH, list?: PH) => Take)

function _take<T>(n: number, list: T[] | string) {
  return slice(0, n < 0 ? Infinity : n, list)
}

const dispatchedTake = dispatch(TakeTransformer as any, _take)

/**
 * Returns first `n` elements of the array or string.
 * 
 * Acts as a transducer if a transformer is given in `list`.
 */
export const take: Take = curryN(2, dispatchedTake)
