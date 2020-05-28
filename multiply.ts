import curryN from "./utils/curry_n.ts"
import { Curry2 } from "./utils/types.ts"

function multiply(a: number, b: number) {
  return a * b
}

export default curryN(2, multiply) as Curry2<number>
