import type { Predicate1, PH } from "./utils/types.ts"
import { slice } from "./slice.ts"
import { dispatch } from "./utils/dispatch.ts"
import DropLastWhileTransformer from "./utils/Transformers/dropLastWhile.ts"
import curryN from "./utils/curry_n.ts"

// @types
type DropLastWhile_2<L extends T[] | string, T> = ((list: L) => L)
  & ((list?: PH) => DropLastWhile_2<L, T>)

type DropLastWhile_1<L extends T[] | string, T> = ((predicate: Predicate1<T>) => L)
  & ((predicate?: PH) => DropLastWhile_1<L, T>)

type DropLastWhile = (<L extends T[] | string, T>(predicate: Predicate1<T>, list: L) => L)
  & (<L extends T[] | string, T>(predicate: Predicate1<T>, list?: PH) => DropLastWhile_2<L, T>)
  & (<L extends T[] | string, T>(predicate: PH, list: L) => DropLastWhile_1<L, T>)
  & ((predicate?: PH, list?: PH) => DropLastWhile)

function _dropLastWhile<L extends T[] | string, T>(predicate: Predicate1<T>, list: L): L {
  let i = list.length - 1
  while(i >= 0 && predicate(list[i] as any)) i--

  return slice(0, i + 1, list)
}

const dispatched = dispatch(DropLastWhileTransformer, _dropLastWhile)

/**
 * Returns a new list excluding the trailing elements of a `list` which
 * satisfies `predicate`. Skips all the elements which on applied on `predicate`
 * returns `true`. The new list ends with last `false`.
 * 
 * Acts as a transducer if a transformer is passed in place of `list`
 * 
 *
 *      const lteThree = x => x <= 3;
 *      Fae.dropLastWhile(lteThree, [1, 2, 3, 4, 3, 2, 1]); //=> [1, 2, 3, 4]
 *      Fae.dropLastWhile(x => x !== 't' , 'dispatch'); //=> 'dispat'
 */
export const dropLastWhile: DropLastWhile = curryN(2, dispatched)
