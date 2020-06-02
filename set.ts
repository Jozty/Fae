import { Lens } from "./lens.ts"
import { Curry3 } from "./utils/types.ts"
import over from "./over.ts"
import always from "./always.ts"
import curryN from "./utils/curry_n.ts"
 
function set(lens: Lens, value: any, target: any) {
  return over(lens, always(value), target)
}

export default curryN(3, set) as Curry3<Lens, any, any, any>
