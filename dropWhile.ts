import type { Predicate1, PH } from './utils/types.ts'
import { slice } from './slice.ts'
import { dispatch } from './utils/dispatch.ts'
import curryN from './utils/curry_n.ts'
import DropWhileTransformer from './utils/Transformers/dropWhile.ts'

// @types
type DropWhile_2<L extends T[] | string, T> = ((functor: L) => L) &
  ((functor?: PH) => DropWhile_2<L, T>)

type DropWhile_1<L extends T[] | string, T> = ((
  predicate: Predicate1<T>,
) => L) &
  ((predicate?: PH) => DropWhile_1<L, T>)

type DropWhile = (<L extends T[] | string, T>(
  predicate: Predicate1<T>,
  functor: L,
) => L) &
  (<L extends T[] | string, T>(
    predicate: Predicate1<T>,
    functor?: PH,
  ) => DropWhile_2<L, T>) &
  (<L extends T[] | string, T>(
    predicate: PH,
    functor: L,
  ) => DropWhile_1<L, T>) &
  ((predicate?: PH, functor?: PH) => DropWhile)

function _dropWhile<L extends T[] | string, T>(
  predicate: Predicate1<T>,
  functor: L,
) {
  const len = functor.length
  let i = 0
  while (i < len && predicate(functor[i] as any)) i++
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
export const dropWhile: DropWhile = curryN(2, dispatchedDropWhile)
