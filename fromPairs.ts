import curryN from './utils/curry_n.ts'
import { Prop } from './prop.ts'
import { Obj } from "./utils/types.ts"


// @types
type FromPairs = <T>(pairs: Pair<T>[]) => Record<string, T>

export type Pair<T = any> = [Prop, T]

function _fromPairs<T>(pairs: Pair<T>[]) {
  const result: Obj<T> = {}
  pairs.forEach((p) => {
    result[p[0]] = p[1]
  })

  return result
}
/**
 * Creates a new object from a list key-value pairs. If a key appears in
 * multiple pairs, the rightmost pair is included in the object.
 *
 *      Fae.fromPairs([['a', 1], ['b', 2], ['c', 3]]); //=> {a: 1, b: 2, c: 3}
 */
export const fromPairs: FromPairs = curryN(1, _fromPairs)
