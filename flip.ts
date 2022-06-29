// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import type { Func } from './utils/types.ts'
import { getFunctionLength } from './utils/get.ts'
import curryN from './utils/curry_n.ts'

/**
 * Returns a new function much like the supplied one, except that the first two
 * arguments' order is reversed. The returned function is automatically curried.
 * But the types are not preserved as of now. For that matter, you can use `Curry1`,
 * `Curry2`, `Curry3`.
 *
 *
 *      const mergeThree = (a, b, c) => [].concat(a, b, c)
 *      mergeThree(1, 2, 3); // [1, 2, 3]
 *      Fae.flip(mergeThree)(1, 2, 3); // [2, 1, 3]
 */
export function flip<T, A extends unknown[], R>(fn: (a: T, b: T, ...rest: A) => R) {
  return curryN(getFunctionLength(fn), function (
    this: any,
    b: T,
    a: T,
    ...rest: A
  ) {
    return fn.apply(this, [a, b, ...rest])
  })
}
