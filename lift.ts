import curryN from "./utils/curry_n.ts"
import type { Func, PH } from "./utils/types.ts"
import { liftN }  from "./liftN.ts"
import { getFunctionLength } from "./utils/get.ts"

// @types
type Lift = ((f: Func) => Func)
  & ((f?: PH) => Lift)

function _lift(f: Func){
  return liftN(getFunctionLength(f), f)
}

export const lift: Lift = curryN(1, _lift)
