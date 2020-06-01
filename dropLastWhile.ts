import { Predicate1, Curry2 } from "./utils/types.ts"
import slice from "./slice.ts"
import { dispatch } from "./utils/dispatch.ts"
import DropLastWhileTransformer from "./utils/Transformers/dropLastWhile.ts"
import curryN from "./utils/curry_n.ts"

function dropLastWhile<T>(predicate: Predicate1<T | string>, list: T[] | string) {
  let i = list.length - 1
  while(i >= 0 && predicate(list[i])) i--

  return slice(0, i + 1, list)
}

const dispatched = dispatch(DropLastWhileTransformer, dropLastWhile)

/** Returns a new list excluding the trailing elements of a `list` which
 * satisfies `predicate`. Skips all the elements which on applied on `predicate`
 * returns `true`. The new list ends with last `false`.
 * 
 * Acts as a transducer if a transformer is passed in place of `list`
 * @function
 *
 *      const lteThree = x => x <= 3;
 *      Fae.dropLastWhile(lteThree, [1, 2, 3, 4, 3, 2, 1]); //=> [1, 2, 3, 4]
 *      Fae.dropLastWhile(x => x !== 't' , 'dispatch'); //=> 'dispat'
 */
export default curryN(2, dispatched) as Curry2<Predicate1, any[] | string, any[] | string>
