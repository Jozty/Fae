// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import type {
  Predicate1,
  PH,
  InferElementType,
  InferType,
} from './utils/types.ts'
import { slice } from './slice.ts'
import { dispatch } from './utils/dispatch.ts'
import DropLastWhileTransformer from './utils/Transformers/dropLastWhile.ts'
import curryN from './utils/curry_n.ts'

// @types
// prettier-ignore
type DropLastWhile_2<T> = <L extends T[] | string>(list: L) => InferType<L>

// prettier-ignore
type DropLastWhile_1<L extends any[] | string> = (predicate: Predicate1<InferElementType<L>>) => InferType<L>

// prettier-ignore
type DropLastWhile =
  & (<T>(predicate: Predicate1<T>, list?: PH) => DropLastWhile_2<T>)
  & (<L extends any[] | string>(predicate: PH, list: L) => DropLastWhile_1<L>)
  & (<L extends T[] | string, T>(predicate: Predicate1<T>, list: L) => InferType<L>)

function _dropLastWhile<L extends T[] | string, T>(
  predicate: Predicate1<T>,
  list: L,
) {
  let i = list.length - 1
  while (i >= 0 && predicate(list[i] as any)) i--

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
