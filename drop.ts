import { slice } from "./slice.ts"
import { dispatch } from "./utils/dispatch.ts"
import DropTransformer from "./utils/Transformers/drop.ts"
import curryN from "./utils/curry_n.ts"
import { PH } from "./utils/types.ts"

// @types
type Drop_2 = (<L extends T[] | string, T>(list: L) => L)
  & ((list?: PH) => Drop_2)

type Drop_1<L extends T[] | string, T> = ((n: number) => L)
  & ((n?: PH) => Drop_1<L, T>)

type Drop = (<L extends T[] | string, T>(n: number, list: L) => L)
  & ((n: number, list?: PH) => Drop_2)
  & (<L extends T[] | string, T>(n: PH, list: L) => Drop_1<L, T>)
  & ((n?: PH, list?: PH) => Drop)


function _drop<L extends T[] | string, T>(n: number, list: L) {
  return slice(Math.max(0, n), Infinity, list)
}

const dispatchedDrop = dispatch(DropTransformer as any, _drop)

/**
 * Returns all but first `n` elements of given list.
 * 
 * Acts as a transducer if a transformer is passed in place of `list`
 * 
 *
 *      Fae.drop(1, ['foo', 'bar', 'baz']); //=> ['bar', 'baz']
 *      Fae.drop(2, ['foo', 'bar', 'baz']); //=> ['baz']
 *      Fae.drop(3, ['foo', 'bar', 'baz']); //=> []
 *      Fae.drop(4, ['foo', 'bar', 'baz']); //=> []
 *      Fae.drop(3, 'foobar');               //=> 'bar'
 */
export const drop: Drop = curryN(2, dispatchedDrop)
