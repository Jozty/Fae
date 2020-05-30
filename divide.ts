import curryN from "./utils/curry_n.ts"
import { Curry2 } from "./utils/types.ts"

function divide(a: number, b: number) {
  return a / b
}
/** Divides two numbers. Equivalent to `a / b`.
 * @function */
export default curryN(2, divide) as Curry2<number>
