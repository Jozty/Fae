import curryN from "./utils/curry_n.ts"
import { Curry } from "./utils/types.ts"

/**
 * Returns the curried function
 * **NOTE** The passed function will be called as soon as expected number
 * of arguments are received. Rest will be ignored.
 * 
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
export const curry: Curry<typeof curryN> = curryN(2, curryN)
