// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import curryN from './utils/curry_n.ts';

// @types
type Min_2<T extends number | string | Date> = (b: T) => T;

type _Min<T extends number | string | Date> =
  & ((a: T) => Min_2<T>)
  & ((a: T, b: T) => T);

type Min = _Min<number> & _Min<string> & _Min<Date>;

function _min<T extends number | string | Date>(a: T, b: T) {
  return a < b ? a : b;
}

/**
 * Returns the smaller of its two arguments.
 */
export const min: Min = curryN(2, _min);
