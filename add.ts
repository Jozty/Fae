import curryN from "./utils/curry_n.ts"
import { Curry } from "./utils/types.ts"

function _add(a: number, b: number) {
  return a + b
}

/**
 * Adds two numbers
 * 
 *      const add5 = Fae.add(5, Fae._)
 *      const a = add5(4) // 9
 */
 export const add: Curry<typeof _add> = curryN(2, _add)
