// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import curryN from './utils/curry_n.ts';

// @types
type Not = <T>(fn: T) => boolean;

function _not<T>(a: T) {
  return !a;
}

/**
 * Returns the not(complement) value of the given value
 */
export const not: Not = curryN(1, _not);
