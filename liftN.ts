// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import curryN from './utils/curry_n.ts';
import type { Func, PH } from './utils/types.ts';
import { reduce } from './reduce.ts';
import { ap } from './ap.ts';
import { map } from './map.ts';
import { tail } from './tail.ts';

// @types
type LiftN_2 = (fn: Func) => Func;

type LiftN_1 = (arity: number) => Func;

type LiftN =
  & ((arity: number) => LiftN_2)
  & ((arity: PH, fn: Func) => LiftN_1)
  & ((arity: number, fn: Func) => Func);

function _liftN(arity: number, fn: Func): Func {
  const lifted = curryN(arity, fn);
  const f = function () {
    const args = tail(arguments);
    const mapped = (map(lifted, arguments[0]) as any) as Func[];
    return reduce(ap, mapped, args);
  };
  return curryN(arity, f);
}

/**
 * Lifts `fn` to a specified `arity`. The returned function applies
 * the `fn` on `arity` number of lists in all possible combination
 * of elements of the lists passe. The result is accumulated in a list
 *
 *      const add2 = Fae.liftN(3, (...args: number[]) => R.sum(args))
 *      add2([1,2,3], [1,2,3], [1]); //=> [3, 4, 5, 4, 5, 6, 5, 6, 7]
 */
export const liftN = curryN(2, _liftN) as LiftN;
