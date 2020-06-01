
import curryN from "./utils/curry_n.ts"
import { Curry2, Obj, Tests } from "./utils/types.ts"
import has from "./utils/has.ts"

function where(specs : Tests , testObj: Obj) {
  for (let prop in specs) {
    if (
      has(specs, prop) 
      && !specs[prop](testObj[prop])
      ){ return false }
  }
  return true
}

export default curryN(2, where) as Curry2<any, any, boolean>