// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import type { Comparator, Predicate2 } from './utils/types.ts';

/**
 * Returns a comparator out of `predicate` which returns `true` when
 * its first argument is less than the second, `false` otherwise
 */
export function comparator<T>(
  predicate: Predicate2<T, T>,
): Comparator<T> {
  return function (a: T, b: T) {
    if (predicate(a, b)) return -1;
    if (predicate(b, a)) return 1;
    return 0;
  };
}
