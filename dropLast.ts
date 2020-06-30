import { dispatch } from "./utils/dispatch.ts"
import curryN from "./utils/curry_n.ts"
import { PH } from "./utils/types.ts"
import { take } from "./take.ts"
import DropLastTransformer from "./utils/Transformers/dropLast.ts"

// @types
type DropLast_2 = (<L extends T[] | string, T>(list: L) => L)
  & ((list?: PH) => DropLast_2)

type DropLast_1<L extends T[] | string, T> = ((n: number) => L)
  & ((n?: PH) => DropLast_1<L, T>)

type DropLast = (<L extends T[] | string, T>(n: number, list: L) => L)
  & ((n: number, list?: PH) => DropLast_2)
  & (<L extends T[] | string, T>(n: PH, list: L) => DropLast_1<L, T>)
  & ((n?: PH, list?: PH) => DropLast)

function _dropLast<L extends T[] | string, T>(n: number, list: L) {
  return take(
    n < list.length ? list.length - n : 0,
    list
  )
}

const dispatchedDropLast = dispatch(DropLastTransformer as any, _dropLast)

/**
 * Returns all but last `n` elements of given list.
 * 
 * Acts as a transducer if a transformer is passed in place of `list`
 * 
 *
 *      Fae.dropLast(1, ['foo', 'bar', 'baz']); //=> ['foo', 'bar']
 *      Fae.dropLast(2, ['foo', 'bar', 'baz']); //=> ['foo']
 *      Fae.dropLast(3, ['foo', 'bar', 'baz']); //=> []
 *      Fae.dropLast(4, ['foo', 'bar', 'baz']); //=> []
 *      Fae.dropLast(3, 'foobar');               //=> 'foo'
 */
export const dropLast: DropLast = curryN(2, dispatchedDropLast)
