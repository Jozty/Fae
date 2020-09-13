import { drop } from "./drop.ts"
import curryN from "./utils/curry_n.ts"
import type { PH } from "./utils/types.ts"

// TODO: write transformer

// @types
type TakeLast_2 = (<F extends T[] | string, T>(functor: F) => F)
  & ((functor?: PH) => TakeLast_2)

type TakeLast_1<F extends T[] | string, T> = ((n: number) => F)
  & ((n?: PH) => TakeLast_1<F, T>)

type TakeLast = (<F extends T[] | string, T>(n: number, functor: F) => F)
  & ((n: number, functor?: PH) => TakeLast_2)
  & (<F extends T[] | string, T>(n: PH, functor: F) => TakeLast_1<F, T>)
  & ((n?: PH, functor?: PH) => TakeLast)

/**
 * Returns last `n` elements of the array or string.
 * If `n > functor.length` or `n` is negative, a copy of `functor` is returned.
 */
function _takeLast<F extends T[] | string, T>(n: number, functor: F) {
  return drop(n >= 0 ? functor.length - n : 0, functor)
}

export const takeLast: TakeLast = curryN(2, _takeLast)
