// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import { drop } from './drop.ts';
import curryN from './utils/curry_n.ts';
import type { InferType, PH } from './utils/types.ts';

// TODO: write transformer

// @types
type TakeLast_2 = <F extends any[] | string>(functor: F) => InferType<F>;

type TakeLast_1<F extends any[] | string> = (n: number) => InferType<F>;

type TakeLast =
  & ((n: number) => TakeLast_2)
  & (<F extends any[] | string>(n: PH, functor: F) => TakeLast_1<InferType<F>>)
  & (<F extends any[] | string>(n: number, functor: F) => InferType<F>);

/**
 * Returns last `n` elements of the array or string.
 * If `n > functor.length` or `n` is negative, a copy of `functor` is returned.
 */
function _takeLast<F extends any[] | string>(n: number, functor: F) {
  return drop(n >= 0 ? functor.length - n : 0, functor);
}

export const takeLast: TakeLast = curryN(2, _takeLast);
