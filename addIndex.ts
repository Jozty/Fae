// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import { concat } from './concat.ts';
import curryN from './utils/curry_n.ts';
import type { Func } from './utils/types.ts';
import { getFunctionLength } from './utils/get.ts';

/**
 * Returns a new iteration function from the passed function
 * by adding two more parameters to its callback function
 * 1. the current index
 * 2. the entire list
 * The passed function must have first argument as the iteration functions
 * and last arguments as the list
 * @function
 *
 *      const indexedMap = Fae.addIndex(Fae.map)
 *      indexedMap((val, idx) => idx + '-' + val, ['f', 'o', 'o', 'b', 'a', 'r'])
 *      // ['0-f', '1-o', '2-o', '3-b', '4-a', '5-r']
 */
export function addIndex<A extends unknown[], R, This>(fn: Func<A, R, This>) {
  return curryN(getFunctionLength(fn), function (this: This, ...args: A) {
    let index = 0;
    const origFn = args[0] as Func<A, R, This>;
    const list = args[args.length - 1];

    args[0] = (...argsToActualFunction: A) => {
      let result = origFn.apply(
        this,
        concat([...argsToActualFunction], [index, list]) as A,
      );
      index += 1;
      return result;
    };

    return fn.apply(this, args);
  });
}
