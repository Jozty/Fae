// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import type { Obj, PH, Tests } from './utils/types.ts';
import curryN from './utils/curry_n.ts';

// @types
type WhereAll_2<T> = (testObj: Obj<T>) => boolean;

type WhereAll_1<T> = (specs: Tests<T>) => boolean;

type WhereAll =
  & (<T>(specs: Tests<T>) => WhereAll_2<T>)
  & (<T>(specs: PH, testObj: Obj<T>) => WhereAll_1<T>)
  & (<T>(specs: Tests<T>, testObj: Obj<T>) => boolean);

function _whereAll<T>(specs: Tests<T>, testObj: Obj<T>) {
  let count = 0;
  for (const key in specs) {
    count++;
    const pred = specs[key];
    const value = testObj[key];
    if (!pred(value)) return false;
  }
  return count !== 0;
}

/**
 * Takes a specs objects whose properties are predicate functions
 * Each predicate is applied to the value of the corresponding property of the
 * test object. Returns `true` if all the predicates are satisfied, `false` otherwise.
 * **NOTE** returns `false` if there is no predicated functions
 *
 *      const equals = curry(2, (x: number, y: number) => x === y)
 *      const spec = {x: equals(100), y: equals(20)}
 *      Fae.whereAll(spec, {x: 0, y: 200}) // false
 *      Fae.whereAll(spec, {x: 0, y: 10}) // false
 *      Fae.whereAll(spec, {x: 0, y: 2}) // true
 *      Fae.whereAll(spec, {x: 1, y: 2}) // false
 */
export const whereAll: WhereAll = curryN(2, _whereAll);
