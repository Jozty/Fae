import curryN from "./utils/curry_n.ts"
import { Curry2 } from "./utils/types.ts"

function _add(a: number, b: number) {
  return a + b
}

/**
 * Adds two numbers
 * 
 *      const add5 = Fae.add(5, Fae._)
 *      const a = add5(4) // 9
 */
 export const add: Curry2<number, number, number> = curryN(2, _add)
