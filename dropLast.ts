import { dispatch } from "./utils/dispatch.ts"
import curryN from "./utils/curry_n.ts"
import { Curry2 } from "./utils/types.ts"
import { take } from "./take.ts"
import DropLastTransformer from "./utils/Transformers/dropLast.ts"

function _dropLast<T>(n: number, list: T[] | string) {
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
export const dropLast: Curry2<number, any[] | string, any[] | string> = curryN(2, dispatchedDropLast)
