import { Predicate1, Curry2 } from "./utils/types.ts"
import slice from "./slice.ts"
import { dispatch } from "./utils/dispatch.ts"
import curryN from "./utils/curry_n.ts"
import DropWhileTransformer from "./utils/Transformers/dropWhile.ts"

function dropWhile<T>(predicate: Predicate1<T | string>, functor: T[] | string) {
  const len = functor.length
  let i = 0
  while(i < len && predicate(functor[i])) i++
  return slice(i, Infinity, functor) 
}

const dispatchedDropWhile = dispatch(DropWhileTransformer, dropWhile)

/** Returns a new list excluding the leading elements of a `functor` which
 * satisfies `predicate`. Skips all the elements which on applied on `predicate`
 * returns `true`. The new list starts with first `false`.
 * 
 * Acts as a transducer if a transformer is passed in place of `functor`
 * @function
 *
 *      Fae.dropLast(1, ['foo', 'bar', 'baz']); //=> ['foo', 'bar']
 *      Fae.dropLast(2, ['foo', 'bar', 'baz']); //=> ['foo']
 *      Fae.dropLast(3, ['foo', 'bar', 'baz']); //=> []
 *      Fae.dropLast(4, ['foo', 'bar', 'baz']); //=> []
 *      Fae.dropLast(3, 'foobar');               //=> 'foo'
 */
export default curryN(2, dispatchedDropWhile) as Curry2<Predicate1, any[] | string, any[] | string>
