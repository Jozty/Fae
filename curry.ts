import curryN from "./utils/curry_n.ts"
import { Curry2, Func } from "./utils/types.ts"

/**
 * Returns the curried function
 *      const f = (a, b, c) => 2 * a + 3 * b + c
 *      const g = curry(f.length, f)
 *      g(1, 2, 3) // 11
 *      g(1)(2, 3) // 11
 *      g(1)(2)(3) // 11
 *      g(1, 2)(3) // 11
 *      g(_, 2, 3)(1) // 11
 *      g(_, _, 3)(1, 2) // 11
*/
export default curryN(2, curryN) as Curry2<number, Func, Func>
