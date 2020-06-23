import curryN from "./utils/curry_n.ts"
import { Func, Curry } from "./utils/types.ts"
import { liftN }  from "./liftN.ts"
import { getFunctionLength } from "./utils/get.ts"

function _lift(f: Func){
  return liftN(getFunctionLength(f), f)
}

export const lift: Curry<typeof _lift> = curryN(1, _lift)
