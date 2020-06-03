import curryN from "./utils/curry_n.ts"
import { Curry2 } from "./utils/types.ts"

function _multiply(a: number, b: number) {
  return a * b
}

/**
 * Multiplies two numbers. Equivalent to `a * b` but curried.
 */
export const multiply: Curry2<number> = curryN(2, _multiply)
