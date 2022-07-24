// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import { isString } from './utils/is.ts';
import curryN from './utils/curry_n.ts';
import { InferType } from './utils/types.ts';

// @types
type Reverse = <F extends T[] | string, T = unknown>(
  functor: F,
) => InferType<F>;

function _reverse<F extends T[] | string, T>(functor: F): InferType<F> {
  if (isString(functor)) {
    return functor.split('').reverse().join('') as InferType<F>;
  }

  return [...functor].reverse() as InferType<F>;
}

/** Reverses given string or array without affecting the original. */
export const reverse = curryN(1, _reverse) as Reverse;
