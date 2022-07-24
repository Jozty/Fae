// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import curryN from './utils/curry_n.ts';

// @types
type And_2 = (b: unknown) => boolean;

type And =
  & ((a: unknown) => And_2)
  & ((a: unknown, b: unknown) => boolean);

function _and(a: unknown, b: unknown) {
  return !!(a && b);
}

/**
 * Returns `true` if both arguments are `true`, `false` otherwise.
 *
 *      Fae.and(true, true)   //=> true
 *      Fae.and(true, false)  //=> false
 *      Fae.and(false, true)  //=> false
 *      Fae.and(false, false) //=> false
 */
export const and = curryN(2, _and) as And;
