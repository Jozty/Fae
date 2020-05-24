import curryN from "./utils/curry_n.ts"
import { Curry2 } from "./utils/types.ts"

function multiply(a: number, b: number) {
  return a * b
}

export default <Curry2<number, number, number>>curryN(2, multiply)
