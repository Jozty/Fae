import curryN from "./utils/curry_n.ts"
import { Func, Curry1 } from "./utils/types.ts"
import { liftN }  from "./liftN.ts"
import { getFunctionLength } from "./utils/get.ts"

function _lift(f: Func){
  return liftN(getFunctionLength(f), f)
}

export const lift: Curry1<Func, Func> = curryN(1, _lift)
