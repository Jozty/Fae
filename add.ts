import curryN from "./utils/curry_n.ts"
import { Curry2 } from "./utils/types.ts"

function add(a: number, b: number) {
  return a + b
}

/** Adds two numbers
 * @function
 * 
 *      const add5 = Fae.add(5, Fae._)
 *      const a = add5(4) // 9 */
export default curryN(2, add) as Curry2<number, number, ReturnType<typeof add>>
