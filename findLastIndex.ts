import { Predicate1, Curry2 } from "./utils/types.ts"
import curryN from "./utils/curry_n.ts"
import { dispatch } from "./utils/dispatch.ts"
import FindLastIdxTransformer from "./utils/Transformers/findLastIndex.ts"

function _findLastIndex<T>(predicate: Predicate1, list: T[] | string ) {
  for(let i = list.length - 1; i >= 0; i--) {
    if(predicate(list[i])) return i
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
export const findLastIndex: Curry2<Predicate1, any[], number> = curryN(2, dispatched)
