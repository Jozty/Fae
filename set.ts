import { Lens } from "./lens.ts"
import { Curry3 } from "./utils/types.ts"
import over from "./over.ts"
import always from "./always.ts"
import curryN from "./utils/curry_n.ts"
 
function set(lens: Lens, value: any, target: any) {
  return over(lens, always(value), target)
}

/**
 * Returns the result of "setting" the portion of the given data structure `target`
 * focused by the given `len`s to the given `value`.
 * 
 *      const xLens = Fae.lensProp('x')
 *      Fae.set(xLens, 4, {x: 1, y: 2})  //=> {x: 4, y: 2}
 *      Fae.set(xLens, 8, {x: 1, y: 2})  //=> {x: 8, y: 2}
 */
export default curryN(3, set) as Curry3<Lens, any, any, any>
