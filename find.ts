import { Predicate1, Curry2 } from "./utils/types.ts"
import curryN from "./utils/curry_n.ts"
import { dispatch } from "./utils/dispatch.ts"
import FindTransformer from "./utils/Transformers/find.ts"

function _find<T>(predicate: Predicate1<T>, list: T[]) {
  for(let i = 0; i < list.length; i++) {
    if(predicate(list[i])) return list[i]
  }
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
export const find: Curry2<Predicate1, any[], any> = curryN(2, dispatched)
