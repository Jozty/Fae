import curryN from "./utils/curry_n.ts"
import { Curry2 } from "./utils/types.ts"

function multiply(a: number, b: number) {
  return a * b
}

/** Multiplies two numbers. Equivalent to `a * b` but curried.
 * @function */
export default curryN(2, multiply) as Curry2<number>
