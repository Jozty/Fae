
import curryN from "./utils/curry_n.ts"
import { Curry, Obj, Tests } from "./utils/types.ts"
import has from "./utils/has.ts"

// TODO: (ch-shubham) add docs

function _where<T>(specs : Tests<T> , testObj: Obj<T>) {
  for (let prop in specs) {
    if (
      has(specs, prop) 
      && !specs[prop](testObj[prop])
      ){ return false }
  }
  return true
}

export const where: Curry<typeof _where> = curryN(2, _where)