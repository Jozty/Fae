// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import type { PH, Predicate1 } from './utils/types.ts';
import { dispatch } from './utils/dispatch.ts';
import AnyTransformer from './utils/Transformers/any.ts';
import curryN from './utils/curry_n.ts';

// @types
type Any_2<T> = (list: T[]) => boolean;

type Any_1<T> = (predicate: Predicate1<T>) => boolean;

type Any =
  & (<T>(predicate: Predicate1<T>) => Any_2<T>)
  & (<T>(predicate: PH, list: T[]) => Any_1<T>)
  & (<T>(predicate: Predicate1<T>, list: T[]) => boolean);

function _any<T>(predicate: Predicate1<T>, list: T[]) {
  for (let i = 0; i < list.length; i++) {
    if (predicate(list[i])) return true;
  }
  return false;
}

const dispatched = dispatch(AnyTransformer, _any);

/**
 * Return `true` if any the elements of the list match `predicate`
 * `false` otherwise
 *
 * Acts as a transducer if a transformer is passed in place of `list`
 */
export const any: Any = curryN(2, dispatched);
