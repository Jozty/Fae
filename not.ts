import curryN from "./utils/curry_n.ts"
import { Curry1 } from "./utils/types.ts"

function _not(a: any){
  return !a;
}

export const not: Curry1<any, boolean> = curryN(1, _not)
