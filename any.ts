import { Predicate1, Curry } from "./utils/types.ts"
import { dispatch } from './utils/dispatch.ts'
import AnyTransformer from "./utils/Transformers/any.ts"
import curryN from './utils/curry_n.ts'

function _any<T>(predicate: Predicate1<T>, list: T[]) {
  for(let i = 0; i < list.length; i++) {
    if(predicate(list[i])) return true
  }
  return false
}

const dispatched = dispatch(AnyTransformer, _any)

/**
 * Return `true` if any the elements of the functor match `predicate`
 * `false` otherwise
 * 
 * Acts as a transducer if a transformer is passed in place of `functor`
 */
export const any: Curry<typeof _any> = curryN(2, dispatched)
