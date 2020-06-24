import curryN from './utils/curry_n.ts'
import { Curry } from './utils/types.ts'

export type Pair<T = any> = [string | number, T]

function _fromPairs<T>(pairs: Pair<T>[]) {
  const result: {
    [key: string]: T 
  } = {}
  pairs.forEach(p => {
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
export const fromPairs: Curry<typeof _fromPairs> = curryN(1, _fromPairs)
