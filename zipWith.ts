import { Func, Curry3 } from "./utils/types.ts"
import curryN from "./utils/curry_n.ts"

function zipWith<T1 = any, T2 = any, R = any>(
  fn: (a: T1, b: T2) => R,
  list1: T1[],
  list2: T2[]
) {
  const len = Math.min(list1.length, list2.length)
  const result = new Array<R>(len)
  for(let i = 0; i < len; i++) {
    result[i] = fn(list1[i], list2[i])
  }
  return result
}

/** Creates a new list out of two passed lists `list1`, `list2`.
 * Each item of new list is calculated by applying equally-positioned pair
 * in both the lists.
 * The returned is truncated to the length of the shorter of the two input lists.
 * @function
 * 
 *      Fae.zipWith(Fae.add, [100, 200, 300], [1, 2, 3]) // [101, 202, 303]
 */
export default curryN(3, zipWith) as Curry3<Func, any[], any[], any[]>
