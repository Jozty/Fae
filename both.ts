import curryN from './utils/curry_n.ts'
import type { Func, PH } from './utils/types.ts'
import { isFunction } from './utils/is.ts'
import { lift } from './lift.ts'
import { and } from './and.ts'

// @types
type Both_2<T> = ((g: T) => T) & ((g?: PH) => Both_2<T>)

type Both_1<T> = ((f: T) => T) & ((f?: PH) => Both_1<T>)

type Both = (<T>(f: T, g: T) => T) &
  (<T>(f: T, g?: PH) => Both_2<T>) &
  (<T>(f: PH, g: T) => Both_1<T>) &
  ((f?: PH, g?: PH) => Both)

function _both<T extends Func>(f: T, g: T): T {
  if (isFunction(f)) {
    const __both = function (this: any, ...args: any[]) {
      return f.apply(this, args) && g.apply(this, args)
    }
    return __both as T
  } else {
    return lift(and)(f, g)
  }
}
/**
 * A function which calls the two provided functions and returns the `&&`
 * of the results.
 * It returns the result of the first function if it is false and the result
 * of the second function otherwise. Second function will not be invoked if the first returns a
 * false value.
 *
 */
export const both: Both = curryN(2, _both)
