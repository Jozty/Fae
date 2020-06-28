import curryN from "./utils/curry_n.ts"
import { PH, Predicate1 } from "./utils/types.ts"
import { dispatch } from './utils/dispatch.ts'
import AllTransformer from "./utils/Transformers/all.ts"

// @types
type All_2<T> = ((functor: ArrayLike<T>) => boolean)
  & ((b?: PH) => All_2<T>)

type All_1<T> = ((predicate: Predicate1<T>) => boolean)
  & ((a?: PH) => All_1<T>)

type All = (<T>(predicate: Predicate1<T>, functor: ArrayLike<T>) => boolean)
  & (<T>(predicate: Predicate1<T>, b?: PH) => All_2<T>)
  & (<T>(predicate: PH, functor: ArrayLike<T>) => All_1<T>)
  & ((a?: PH, b?: PH) => All)

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
export const all: All = curryN(2, dispatchedAll)
