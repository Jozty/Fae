// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import curryN from './utils/curry_n.ts';
import type { InferElementType, Obj, PH, Predicate1 } from './utils/types.ts';
import { complement } from './complement.ts';
import { filter } from './filter.ts';

// @types
type Reject_2<T> = <F extends T[] | Obj<T>>(filterable: F) => F;

type Reject_1<F extends any[] | Obj<any>> = (
  predicate: Predicate1<InferElementType<F>>,
) => F;

type Reject =
  & (<F extends T[] | Obj<T>, T>(predicate: Predicate1<T>, filterable: F) => F)
  & (<T>(predicate: Predicate1<T>) => Reject_2<T>)
  & (<F extends any[] | Obj<any>>(predicate: PH, filterable: F) => Reject_1<F>);

function _reject<F extends T[] | Obj<T>, T>(
  predicate: Predicate1<T>,
  filterable: F,
) {
  return filter(complement(predicate), filterable);
}

/**
 * works as the complement of filter
 *
 *      const isOdd = n => (n & 1) === 1;
 *      const f = Fae.reject(isOdd, [1, 2, 3, 4])
 *      f() // [2, 4]
 */
export const reject = curryN(2, _reject) as Reject;
