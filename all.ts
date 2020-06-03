import curryN from "./utils/curry_n.ts"
import { Curry2, Predicate1 } from "./utils/types.ts"
import { dispatch } from './utils/dispatch.ts'
import AllTransformer from "./utils/Transformers/all.ts"

function _all<T>(predicate: Predicate1<T> , functor: ArrayLike <T> ) {
  let index = 0
  while (index < functor.length) {
    if (!predicate(functor[index])) {
      return false
    }
    index++
  }
  return true
}

const dispatchedAll = dispatch(AllTransformer, _all)

/**
 * Return `true` if all the elements of the functor match `predicate`
 * `false` otherwise
 * 
 * Acts as a transducer if a transformer is passed in place of `functor`
 */
export const all: Curry2 <Predicate1, ArrayLike <any> , boolean> = curryN(2, dispatchedAll)
