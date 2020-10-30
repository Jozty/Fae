import curryN from './utils/curry_n.ts'
import type { Func, PH } from './utils/types.ts'
import { isFunction } from './utils/is.ts'
import { lift } from './lift.ts'
import { or } from './or.ts'

// @types
type Either_2<T> = (g: T) => T

type Either_1<T> = (f: T) => T

type Either =
  & (<T>(f: T, g?: PH) => Either_2<T>)
  & (<T>(f: PH, g: T) => Either_1<T>)
  & (<T>(f: T, g: T) => T)

function _either<T extends Func>(f: T, g: T): T {
  if (isFunction(f)) {
    const __either = function (this: any, ...args: any[]) {
      return f.apply(this, args) || g.apply(this, args)
    }
    return __either as T
  } else {
    return lift(or)(f, g)
  }
}

/**
 * A function wrapping calls to the two functions in an `||` operation,
 * returning the result of the first function if it is true and the result
 * of the second function otherwise. Second function will not be invoked if the first returns a
 * true value.
 *
 *      const gt10 = x => x > 10
 *      const even = x => (x & 1) === 0
 *      const f = Fae.either(gt10, even)
 *      f(101) //=> true
 *      f(8) //=> true
 *
 */
export const either: Either = curryN(2, _either)
