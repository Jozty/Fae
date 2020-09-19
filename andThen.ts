import curryN from './utils/curry_n.ts'
import type { Func, PH } from './utils/types.ts'
import { assertPromise } from './utils/assert.ts'

// @types
type AndThen_2 = ((p: any) => PromiseLike<any>) &
  ((b?: PH) => AndThen_2)

type AndThen_1 = ((f: Func) => PromiseLike<any>) &
  ((a?: PH) => AndThen_1)

type AndThen = ((f: Func, p: any) => PromiseLike<any>) &
  ((f: Func, b?: PH) => AndThen_2) &
  ((a: PH, p: any) => AndThen_1) &
  ((a?: PH, b?: PH) => AndThen)

function _andThen(f: Func, p: any) {
  assertPromise('andThen', p)
  return p.then(f)
}

/**
 * Returns the result of applying the onSuccess function to the value inside
 * a successfully resolved promise. This is useful for working with promises
 * inside function compositions.
 */
export const andThen: AndThen = curryN(2, _andThen)
