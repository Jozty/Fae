import curryN from "./utils/curry_n.ts"
import { Func, Curry } from "./utils/types.ts"
import { isFunction } from "./utils/is.ts"
import { lift } from "./lift.ts"
import { or } from "./or.ts"

function _either(f: Func, g: Func) {
  if(isFunction(f)){
    return function __either(this: any) {
      return f.apply(this, [...arguments]) || g.apply(this, [...arguments])
    }
  }
  return lift(or)(f, g)
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
export const either: Curry<typeof _either> = curryN(2, _either)