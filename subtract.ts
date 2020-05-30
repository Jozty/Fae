import curryN from "./utils/curry_n.ts"
import { Curry2 } from "./utils/types.ts"

function subtract(a: number, b: number) {
  return a - b
}

/** Subtracts its second argument from its first argument.
 * @function */
export default curryN(2, subtract) as Curry2<number, number, number>
