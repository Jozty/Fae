import type {
  Predicate1,
  PH,
  InferType,
  InferElementType,
} from './utils/types.ts'
import { slice } from './slice.ts'
import { dispatch } from './utils/dispatch.ts'
import curryN from './utils/curry_n.ts'
import DropWhileTransformer from './utils/Transformers/dropWhile.ts'

// @types
// prettier-ignore
type DropWhile_2<T> = <L extends T[] | string>(list: L) => InferType<L>

// prettier-ignore
type DropWhile_1<L extends any[] | string> = (predicate: Predicate1<InferElementType<L>>) => InferType<L>

// prettier-ignore
type DropWhile =
  & (<T>(predicate: Predicate1<T>, list?: PH) => DropWhile_2<T>)
  & (<L extends any[] | string>(predicate: PH, list: L) => DropWhile_1<L>)
  & (<L extends T[] | string, T>(predicate: Predicate1<T>, list: L) => InferType<L>)

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
