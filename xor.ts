// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import curryN from './utils/curry_n.ts';
import type { PH } from './utils/types.ts';

// @types
type Xor_2 = <T2>(b: T2) => boolean;

type Xor_1 = <T1>(a: T1) => boolean;

type Xor =
  & (<T1>(a: T1) => Xor_2)
  & (<T2>(a: PH, b: T2) => Xor_1)
  & (<T1, T2>(a: T1, b: T2) => boolean);

function _xor<T1, T2>(a: T1, b: T2) {
  return Boolean(a ? !b : b);
}

/**
 * Exclusive Or - Returns `true` if one of the arguments is truthy and the other is falsy.
 * Otherwise, it returns `false`.
 *
 *      Fae.xor(true, true) //=> false
 *      Fae.xor(true, false) //=> true
 *      Fae.xor(false, true) //=> true
 *      Fae.xor(false, false) //=> false
 */
export const xor = curryN(2, _xor) as Xor;
