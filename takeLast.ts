import { drop } from "./drop.ts"
import curryN from "./utils/curry_n.ts"
import { Curry } from "./utils/types.ts"

// TODO: write transformer

/**
 * Returns last `n` elements of the array or string.
 * If `n > functor.length` or `n` is negative, a a copy of `functor` is returned.
 */
function _takeLast<T>(n: number, functor: T[] | string) {
  return drop(n >= 0 ? functor.length - n : 0, functor)
}

export const takeLast: Curry<typeof _takeLast> = curryN(2, _takeLast)
