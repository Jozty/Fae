import curryN from "./utils/curry_n.ts"
import { Curry2 } from "./utils/types.ts"
import { dispatch } from './utils/dispatch.ts'
import AllTransformer from "./utils/Transformers/all.ts"

type Predicate < T > = (a: T) => boolean

/**
 * Return `true` if all the elements of the functor match `predicate`
 * `false` otherwise
 * 
 * Acts as a transducer if a transformer is passed in place of `functor`
 */
function all <T> (predicate: Predicate <T> , functor: ArrayLike <T> ) {
  let index = 0
  while (index < functor.length) {
    if (!predicate(functor[index])) {
      return false
    }
    index++
  }
  return true
}

const dispatchedAll = dispatch(AllTransformer, all)

export default curryN(2, dispatchedAll) as Curry2 <Predicate <any> , ArrayLike <any> , boolean>
