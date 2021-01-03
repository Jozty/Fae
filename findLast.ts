import type { Predicate1, PH } from './utils/types.ts'
import curryN from './utils/curry_n.ts'
import { dispatch } from './utils/dispatch.ts'
import FindLastTransformer from './utils/Transformers/findLast.ts'

// @types
type FindLast_2<T> = ((list: T[]) => T | undefined)

type FindLast_1<T> = ((predicate: Predicate1<T>) => T | undefined)

type FindLast =
  & (<T>(predicate: Predicate1<T>, list?: PH) => FindLast_2<T>)
  & (<T>(predicate: PH, list: T[]) => FindLast_1<T>)
  & (<T>(predicate: Predicate1<T>, list: T[]) => T | undefined)

function _findLast<T>(predicate: Predicate1<T>, list: T[]) {
  for (let i = list.length - 1; i >= 0; i--) {
    if (predicate(list[i])) return list[i]
  }
  return void 0
}

const dispatched = dispatch(FindLastTransformer, _findLast)

/**
 * Returns the last element of the list which matches the predicate, or
 * `undefined` if no element matches.
 *
 * Acts as a transducer if a transformer is passed in place of `list`
 *
 *      const xs = [{a: 1, b: 0}, {a:1, b: 1}]
 *      Fae.findLast(Fae.propEq('a', 1))(xs) //=> {a: 1, b: 1}
 *      Fae.findLast(Fae.propEq('a', 4))(xs) //=> undefined
 */
export const findLast: FindLast = curryN(2, dispatched)
