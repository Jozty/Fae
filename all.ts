import curryN from "./utils/curry_n.ts"
import { Curry, Predicate1 } from "./utils/types.ts"
import { dispatch } from './utils/dispatch.ts'
import AllTransformer from "./utils/Transformers/all.ts"
import Transformer from "./utils/Transformers/transformers.ts"

function _all<T = any>(predicate: Predicate1<T> , functor: ArrayLike<T>): boolean {
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

function _dispatchedAll<T>(predicate: Predicate1<T> , functor: ArrayLike<T> | Transformer): boolean {
  return dispatchedAll(predicate, functor)
}

/**
 * Return `true` if all the elements of the functor match `predicate`
 * `false` otherwise
 * 
 * Acts as a transducer if a transformer is passed in place of `functor`
 */
export const all: Curry<typeof _dispatchedAll> = curryN(2, dispatchedAll)
