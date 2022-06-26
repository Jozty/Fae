// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import curryN from './utils/curry_n.ts'
import type { Func, PH } from './utils/types.ts'
import { isFunction } from './utils/is.ts'
import { lift } from './lift.ts'
import { and } from './and.ts'

// @types
type Both_2<A extends unknown[]> = (g: Func<A>) => Func<A, boolean>

type Both_1<A extends unknown[]> = (f: Func<A>) => Func<A, boolean>

// prettier-ignore
type Both =
  & (<A extends unknown[]>(f: Func<A>) => Both_2<A>)
  & (<A extends unknown[]>(f: PH, g: Func<A>) => Both_1<A>)
  & (<A extends unknown[]>(f: Func<A>, g: Func<A>) => Func<A, boolean>)

function _both<A extends unknown[]>(f: Func<A>, g: Func<A>): Func<A, boolean> {
  if (isFunction(f)) {
    return function (this: unknown, ...args: A) {
      return !!(f.apply(this, args) && g.apply(this, args))
    }
  } else {
    return lift(and)(f, g)
  }
}

/**
 * A function which calls the two provided functions and returns the `&&`
 * of the results.
 * It returns the result of the first function if it is false and the result
 * of the second function otherwise. Second function will not be invoked if the first returns a
 * false value.
 *
 */
export const both: Both = curryN(2, _both)
