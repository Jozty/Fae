import curryN from "./utils/curry_n.ts"
import { Func, Curry2 } from "./utils/types.ts"
import { isFunction } from "./utils/is.ts"
import { lift } from "./lift.ts"
import { and } from "./and.ts"

function _both(f: Func, g: Func) {
  if(isFunction(f)){
    return function __both(this: any) {
      return f.apply(this, [...arguments]) && g.apply(this, [...arguments])
    }
  }
  else{
    lift(and)(f, g)
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
export const both: Curry2<Func> = curryN(2, _both)