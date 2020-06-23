import curryN from "./utils/curry_n.ts"
import { Curry } from "./utils/types.ts"

function _divide(a: number, b: number) {
  return a / b
}

/**
 * Divides two numbers. Equivalent to `a / b`.
 */
export const divide: Curry<typeof _divide> = curryN(2, _divide)
