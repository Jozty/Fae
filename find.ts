import type { Predicate1, PH } from "./utils/types.ts"
import curryN from "./utils/curry_n.ts"
import { dispatch } from "./utils/dispatch.ts"
import FindTransformer from "./utils/Transformers/find.ts"

// @types
type Find_2<T> = ((list: T[]) => T | undefined)
  & ((list?: PH) => Find_2<T>)

type Find_1<T> = ((predicate: Predicate1<T>) => T | undefined)
  & ((predicate?: PH) => Find_1<T>)

type Find = (<T>(predicate: Predicate1<T>, list: T[]) => T | undefined)
  & (<T>(predicate: Predicate1<T>, list?: PH) => Find_2<T>)
  & (<T>(predicate: PH, list: T[]) => Find_1<T>)
  & ((predicate?: PH, list?: PH) => Find)

function _find<T>(predicate: Predicate1<T>, list: T[]) {
  for(let i = 0; i < list.length; i++) {
    if(predicate(list[i])) return list[i]
  }
  return void 0
}

const dispatched = dispatch(FindTransformer, _find)

/**
 * Returns the first element of the list which matches the predicate, or
 * `undefined` if no element matches.
 *
 * Acts as a transducer if a transformer is passed in place of `list`
 * 
 *      const xs = [{a: 1}, {a: 2}, {a: 3}]
 *      Fae.find(Fae.propEq('a', 2))(xs) //=> {a: 2}
 *      Fae.find(Fae.propEq('a', 4))(xs) //=> undefined
 */
export const find: Find = curryN(2, dispatched)
