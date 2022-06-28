// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import type { Prop } from './prop.ts'
import type { Obj } from './utils/types.ts'

export type Pair<T = any> = [Prop, T]

/**
 * Creates a new object from a list key-value pairs. If a key appears in
 * multiple pairs, the rightmost pair is included in the object.
 *
 *      Fae.fromPairs([['a', 1], ['b', 2], ['c', 3]]); //=> {a: 1, b: 2, c: 3}
 */
export function fromPairs<T>(pairs: Pair<T>[]): Obj<T> {
  const result: Obj<T> = {}
  pairs.forEach((p) => {
    result[p[0]] = p[1]
  })

  return result
}
