import { Func } from './utils/types.ts'
import { getFunctionLength } from './utils/get.ts'
import curryN from './utils/curry_n.ts'

/** Returns a new function much like the supplied one, except that the first two
 * arguments' order is reversed.
 * @function
 * 
 *      const mergeThree = (a, b, c) => [].concat(a, b, c)
 *      mergeThree(1, 2, 3); // [1, 2, 3]
 *      Fae.flip(mergeThree)(1, 2, 3); // [2, 1, 3] */
export default function flip(fn: Func) {
  return curryN(
    getFunctionLength(fn)!,
    function (this: any, a: any, b: any, ...rest: any[]) {
      return fn.apply(this, [b, a, ...rest])
    } as typeof fn
  )
}
