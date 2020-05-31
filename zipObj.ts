import { Obj, Curry2 } from "./utils/types.ts"
import curryN from "./utils/curry_n.ts"

function zipObj<T>(keys: string[], values: T[]): Obj<T> {
  const result: Obj<T> = {}
  const len = Math.min(keys.length, values.length)
  for(let i = 0; i < len; i++) {
    result[keys[i]] = values[i]
  }

  return result
}

/** Returns a new object out of given list of `keys` and `values`.
 * The returned is truncated to the length of the shorter of the two.
 * @function
 * 
 *      Fae.zipObj(['a', 'b', 'c'], [1, 2, 3]) // {a: 1, b: 2, c: 3}
 */
export default curryN(2, zipObj) as Curry2<any[], any[], Obj>
