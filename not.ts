import curryN from "./utils/curry_n.ts"
import { Curry1 } from "./utils/types.ts"

function not(a: any){
  return !a;
}

export default curryN(1, not) as Curry1<any, boolean>
