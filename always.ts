// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import curryN from './utils/curry_n.ts';

// @types
type Always = <T>(value: T) => () => T;

function _always<T>(value: T) {
  return function () {
    return value;
  };
}

/**
 * Returns a function which that always returns `value`
 *
 *      const f = Fae.always('Fae')
 *      f() // 'Fae'
 */
export const always: Always = curryN(1, _always);
