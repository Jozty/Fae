import { Predicate1, Curry } from "./utils/types.ts"
import { slice } from "./slice.ts"
import { dispatch } from "./utils/dispatch.ts"
import curryN from "./utils/curry_n.ts"
import DropWhileTransformer from "./utils/Transformers/dropWhile.ts"

function _dropWhile<T>(predicate: Predicate1<T | string>, functor: T[] | string) {
  const len = functor.length
  let i = 0
  while(i < len && predicate(functor[i])) i++
  return slice(i, Infinity, functor) 
}

const dispatchedDropWhile = dispatch(DropWhileTransformer, _dropWhile)

/**
 * Returns a new list excluding the leading elements of a `functor` which
 * satisfies `predicate`. Skips all the elements which on applied on `predicate`
 * returns `true`. The new list starts with first `false`.
 * 
 * Acts as a transducer if a transformer is passed in place of `functor`
 * 
 * 
 *      const lteTwo = x => x <= 2
 *      Fae.dropWhile(lteTwo, [1, 2, 3, 4, 3, 2, 1]); //=> [3, 4, 3, 2, 1]
 *      Fae.dropWhile(x => x !== 't' , 'dispatch'); //=> 'tch'
 */
export const dropWhile: Curry<typeof _dropWhile> = curryN(2, dispatchedDropWhile)
