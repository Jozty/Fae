import { isString } from './utils/is.ts'
import curryN from './utils/curry_n.ts'
import type { PH } from './utils/types.ts'

// @types
type ReverseReturnType<F> = F extends (infer U)[] ? U[] : string

// prettier-ignore
type Reverse =
  <F extends T[] | string, T = any>(functor: F) => ReverseReturnType<F>

function _reverse<F extends T[] | string, T>(functor: F): F {
  if (isString(functor))
    return functor.split('').reverse().join('') as F
  return [...functor].reverse() as F
}

/** Reverses given string or array without affecting the original. */
export const reverse: Reverse = curryN(1, _reverse)
