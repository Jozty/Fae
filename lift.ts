import curryN from "./utils/curry_n.ts"
import { Func, Curry1 } from "./utils/types.ts"
import liftN  from "./liftN.ts"

//TODO : (ch-shubham) Testing
function lift(f: Func){
  return liftN(f.length, f)
}

export default curryN(2, lift) as Curry1<Func, Func>
