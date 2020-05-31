import curryN from "./utils/curry_n.ts"
import { Curry1 } from "./utils/types.ts"

function always<T>(value: T) {
  return function() {
    return value
  }
}

/** Returns a function which that always returns `value`
 * @function
 * 
 *      const f = Fae.always('Fae')
 *      f() // 'Fae'
 */
export default curryN(1, always) as Curry1<any, () => any>
