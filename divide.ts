import curryN from "./utils/curry_n.ts"
import { Curry2 } from "./utils/types.ts"

function divide(a: number, b: number) {
  return a/b;
}

export default <Curry2<number, number, number>>curryN(2, divide);
