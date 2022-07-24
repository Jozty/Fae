// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import type { Func } from './utils/types.ts';
import type { AbstractTransformer } from './utils/Transformers/transformers.ts';
import { reduce } from './reduce.ts';
import { getTransformer } from './utils/get.ts';

/**
 * Initializes a transducer using supplied iterator function `transformer2`.
 * Returns a single item by iterating through the list,
 * successively calling the transformed `transformer2` and passing it `acc`
 * and the current value from the array, and then passing through `transformer1`
 * and then passing the result to the next call.
 *
 *      const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 *      const t1 = Fae.pipe(
 *        Fae.map(inc),
 *        Fae.filter(even),
 *        Fae.take(2)
 *      )
 *      t1(arr) // [2, 4]
 *      Fae.transduce(t1, Fae.flip(Fae.append), [], arr) // [3]
 */
export function transduce<T, L = T>(
  // inferring the types of transformer1 and transformer2 is of no use
  // because transduce works in opposite way, and so the type returned by
  // transformer1 maybe different from output returned by the action of transduce
  // deno-lint-ignore no-explicit-any
  transformer1: Func<any[], any>,
  // deno-lint-ignore no-explicit-any
  transformer2: Func<any[], any> | AbstractTransformer,
  acc: T,
  functor: L[],
): unknown {
  const trans2 = getTransformer(transformer2);
  return reduce(transformer1(trans2), acc, functor);
}
