import curryN from "./utils/curry_n.ts"
import { Func, Curry1 } from "./utils/types.ts"
import liftN  from "./liftN.ts"
import { getFunctionLength } from "./utils/get.ts"

function lift(f: Func){
  return liftN(getFunctionLength(f)!, f)
}

export default curryN(1, lift) as Curry1<Func, Func>
