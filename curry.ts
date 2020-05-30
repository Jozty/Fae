import curryN from "./utils/curry_n.ts"
import { Curry2, Func } from "./utils/types.ts"

/** Returns the curried function
 * **NOTE** The passed function will be called as soon as expected number
 * of arguments are received. Rest will be ignored.
 * @function
 * 
 *      const f = (a, b, c) => [a, b, c]
 *      const g = curry(f.length, f)
 *      g(1, 2, 3) // [1, 2, 3]
 *      g(1)(2, 3) // [1, 2, 3]
 *      g(1)(2)(3) // [1, 2, 3]
 *      g(1, 2)(3) // [1, 2, 3]
 *      g(_, 2, 3)(1) // [1, 2, 3]
 *      g(_, _, 3)(1, 2) // [1, 2, 3]
 *      g(_, _, 3)(1, 2, 4, 5, 6) // 11 - rest arguments are ignored */
export default curryN(2, curryN) as Curry2<number, Func, Func>
