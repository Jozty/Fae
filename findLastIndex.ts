import type { Predicate1, PH } from './utils/types.ts'
import curryN from './utils/curry_n.ts'
import { dispatch } from './utils/dispatch.ts'
import FindLastIdxTransformer from './utils/Transformers/findLastIndex.ts'

// @types
type FindLastIndex_2<T> = (list: T[]) => number

type FindLastIndex_1<T> = (predicate: Predicate1<T>) => number

// prettier-ignore
type FindLastIndex =
  & (<T>(predicate: Predicate1<T>, list?: PH) => FindLastIndex_2<T>)
  & (<T>(predicate: PH, list: T[]) => FindLastIndex_1<T>)
  & (<T>(predicate: Predicate1<T>,list: T[]) => number)

function _findLastIndex<T>(predicate: Predicate1<T>, list: T[]) {
  for (let i = list.length - 1; i >= 0; i--) {
    if (predicate(list[i])) return i
  }
  return -1
}

const dispatched = dispatch(FindLastIdxTransformer, _findLastIndex)

/**
 * Returns index of last element of the list which matches the predicate, or
 * `-1` if no element matches.
 *
 * Acts as a transducer if a transformer is passed in place of `list`
 *
 *      const xs = [{a: 1}, {a: 2}, {a: 3}]
 *      Fae.find(Fae.propEq('a', 2))(xs) //=> {a: 2}
 *      Fae.find(Fae.propEq('a', 4))(xs) //=> undefined
 */
export const findLastIndex: FindLastIndex = curryN(2, dispatched)
