
import curryN from "./utils/curry_n.ts"
import { Curry2 } from "./utils/types.ts"

function where(specs : any , testObj: any) {
  for (let property in specs) {
    if (Object.prototype.hasOwnProperty.call(specs, property) && !specs[property](testObj[property])) {
      return false;
    }
  }
  return true;
}

export default curryN(2, where) as Curry2<any, any, boolean>