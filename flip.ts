// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import type { Func } from './utils/types.ts';
import { getFunctionLength } from './utils/get.ts';
import curryN from './utils/curry_n.ts';

/**
 * Returns a new function much like the supplied one, except that the first two
 * arguments' order is reversed. The returned function is automatically curried.
 * But the types are not preserved as of now due to TS limitations. The returned function
 * will have all unknown in its parameters list and return type. To make it work properly,
 * you need to use type assertion using `Curry2` or `Curry3`.
 *
 * ```ts
 * import { flip } from './flip.ts'
 * import { Curry3 } from './utils/types.ts'
 *
 * const mergeThree = (a: number, b: number, c: number) => [a].concat(b, c)
 *
 * mergeThree(1, 2, 3); // [1, 2, 3]
 *
 * const flipped = flip(mergeThree)
 *
 * // @ts-expect-error: append should have been type-asserted
 * flipped(1, 2)(3); // [2, 1, 3]
 *
 * const flippedWithTypes = flipped as Curry3<number, number, number, number[]>
 *
 * flippedWithTypes(1, 2)(3); // [2, 1, 3]
 * ```
 */
export function flip<T, A extends unknown[], R>(
  fn: (a: T, b: T, ...rest: A) => R,
) {
  return curryN(getFunctionLength(fn), function (
    this: unknown,
    b: T,
    a: T,
    ...rest: A
  ) {
    return fn.apply(this, [a, b, ...rest]);
  }) as Func<unknown[], unknown, unknown>;
}
