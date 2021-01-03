// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import curryN from './utils/curry_n.ts'
import type { Predicate2, PH } from './utils/types.ts'
import { dispatch } from './utils/dispatch.ts'
import DropRepeatsWithTransformer from './utils/Transformers/dropRepeatsWith.ts'

// @types
type DropRepeatsWith_2<T> = (list: T[]) => T[]

type DropRepeatsWith_1<T> = (predicate: Predicate2<T>) => T[]

// prettier-ignore
type DropRepeatsWith =
  & (<T>(predicate: Predicate2<T>, list?: PH) => DropRepeatsWith_2<T>)
  & (<T>(predicate: PH, list: T[]) => DropRepeatsWith_1<T>)
  & (<T>(predicate: Predicate2<T>, list: T[]) => T[])

function _dropRepeatsWith<T>(predicate: Predicate2<T>, list: T[]) {
  const result = []
  const len = list.length
  if (len === 0) return []

  result[0] = list[0]
  let last = result[0]

  for (let i = 1; i < len; i++) {
    if (!predicate(last, list[i])) result.push(list[i])
    last = list[i]
  }

  return result
}

const dispatched = dispatch(
  DropRepeatsWithTransformer,
  _dropRepeatsWith,
)

/**
 * Returns a new list without consecutively repeating elements.
 * Equality is decided by `predicate`
 *
 * Acts as a transducer if a transformer is given in `list` position.
 *
 *
 */
export const dropRepeatsWith: DropRepeatsWith = curryN(2, dispatched)
