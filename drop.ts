import slice from "./slice.ts"
import { dispatch } from "./utils/dispatch.ts"
import DropTransformer from "./utils/Transformers/drop.ts"
import curryN from "./utils/curry_n.ts"
import { Curry2 } from "./utils/types.ts"

function drop<T>(n: number, list: T[] | string) {
  return slice(Math.max(0, n), Infinity, list)
}

const dispatchedDrop = dispatch(DropTransformer as any, drop)

/** Returns all but first `n` elements of given list.
 * 
 * Acts as a transducer if a transformer is passed in place of `list`
 * @function
 *
 *      Fae.drop(1, ['foo', 'bar', 'baz']); //=> ['bar', 'baz']
 *      Fae.drop(2, ['foo', 'bar', 'baz']); //=> ['baz']
 *      Fae.drop(3, ['foo', 'bar', 'baz']); //=> []
 *      Fae.drop(4, ['foo', 'bar', 'baz']); //=> []
 *      Fae.drop(3, 'foobar');               //=> 'bar'
 */
export default curryN(2, dispatchedDrop) as Curry2<number, any[] | string, any[] | string>
