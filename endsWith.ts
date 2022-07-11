// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import { equals } from './equals.ts';
import { takeLast } from './takeLast.ts';
import curryN from './utils/curry_n.ts';
import type { InferType, PH } from './utils/types.ts';

// @types
type EndsWith_2<L extends unknown[] | string> = (functor: L) => boolean;

type EndsWith_1<L extends unknown[] | string> = (suffix: L) => boolean;

type EndsWith =
  & (<L extends unknown[] | string>(suffix: L) => EndsWith_2<InferType<L>>)
  & (<L extends unknown[] | string>(
    suffix: PH,
    functor: L,
  ) => EndsWith_1<InferType<L>>)
  & (<L extends unknown[] | string>(suffix: L, functor: L) => boolean);

function _endsWith<L extends unknown[] | string>(suffix: L, functor: L) {
  const suffixF = takeLast(suffix.length, functor);
  return equals(suffix, suffixF);
}

/**
 * checks if `functor` ends with `suffix`
 *
 *      Fae.endsWith('c', 'abc')                //=> true
 *      Fae.endsWith('b', 'abc')                //=> false
 *      Fae.endsWith(['c'], ['a', 'b', 'c'])    //=> true
 *      Fae.endsWith(['b'], ['a', 'b', 'c'])    //=> false
 */
export const endsWith = curryN(2, _endsWith) as EndsWith;
