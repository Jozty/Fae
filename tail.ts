import curryN from './utils/curry_n.ts'
import type { PH } from './utils/types.ts'
import { slice } from './slice.ts'

// @types
type TailReturnType<F> = F extends string
  ? string
  : F extends ArrayLike<infer U>
  ? U[]
  : never

// prettier-ignore
type Tail = <F extends ArrayLike<T> | string, T>(functor: F) => TailReturnType<F>

function _tail<T>(functor: ArrayLike<T> | string) {
  return slice(1, Infinity, functor)
}

/**
 * Returns all but the first element of `functor`.
 * Accepts array-like(including string).
 */
export const tail: Tail = curryN(1, _tail)
