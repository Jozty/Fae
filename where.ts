
import curryN from "./utils/curry_n.ts"
import { Curry2, Obj, Tests } from "./utils/types.ts"
import has from "./utils/has.ts"

// TODO: (ch-shubham) add docs

function _where(specs : Tests , testObj: Obj) {
  for (let prop in specs) {
    if (
      has(specs, prop) 
      && !specs[prop](testObj[prop])
      ){ return false }
  }
  return true
}

export const where: Curry2<any, any, boolean> = curryN(2, _where)