import curryN from "./utils/curry_n.ts"
import { Curry1, Func, Curry2 } from "./utils/types.ts"
import { isFunction } from "./utils/is.ts"
import { lift } from "./lift.ts"
import { and } from "./and.ts"

function _both(f: Func, g: Func) {
  return isFunction(f) ?
    function __both(this: any) {
      return f.apply(this, [...arguments]) && g.apply(this, [...arguments])
    } :
    lift(and)(f, g)
}

export const both: Curry2<Func> = curryN(2, _both)