import curryN from "./utils/curry_n.ts"
import { Curry1, Func, Curry2 } from "./utils/types.ts"
import { isFunction } from "./utils/is.ts"
import { lift } from "./lift.ts"
import { or } from "./or.ts"

function _either(f: Func, g: Func) {
  return isFunction(f) ?
    function __either(this: any) {
      return f.apply(this, [...arguments]) || g.apply(this, [...arguments]);
    } :
    lift(or)(f, g);
}

export const either: Curry2<Func> = curryN(2, _either)