// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import curryN from './utils/curry_n.ts';
import type { Func, Predicate } from './utils/types.ts';
import { getFunctionsLengths } from './utils/get.ts';

/**
 * Takes a list of predicates and returns a predicate that returns true for a
 * given list of arguments if every one of the provided predicates is satisfied
 * by those arguments.
 */
export function allPass<T>(predicates: Predicate<T>[]): Func {
  const len = predicates.length;
  const fn = function (this: unknown, ...args: T[]) {
    for (let idx = 0; idx < len; idx++) {
      if (!predicates[idx].apply(this, args)) {
        return false;
      }
    }
    return true;
  };

  const noOfParams = getFunctionsLengths(predicates);

  return curryN(Math.max(...noOfParams, 0), fn);
}
