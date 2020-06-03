import curryN from "./utils/curry_n.ts"
import { Curry2, Obj } from "./utils/types.ts"

function xor(a: any, b: any) {
  return Boolean(a ? !b : b)
}

export default curryN(2, xor) as Curry2<any, any, boolean>