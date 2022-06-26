// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import type { Predicate2, PH } from './utils/types.ts'
import curryN from './utils/curry_n.ts'
import { slice } from './slice.ts'

// @types
type GroupWith_2<L extends T[] | string, T> = (functor: L) => L[]

// prettier-ignore
type GroupWith_1<L extends T[] | string, T> = (predicate: Predicate2<T>) => L[]

// prettier-ignore
type GroupWith =
  & (<L extends T[] | string, T>(predicate: Predicate2<T>) => GroupWith_2<L, T>)
  & (<L extends T[] | string, T>(predicate: PH, functor: L) => GroupWith_1<L, T>)
  & (<L extends T[] | string, T>(predicate: Predicate2<T>, functor: L) => L[])

function _groupWith<L extends T[] | string, T>(
  predicate: Predicate2<T | string>,
  functor: L,
) {
  const result: T[][] | string[] = []
  const len = functor.length
  let i = 0
  while (i < len) {
    let j = i + 1
    while (j < len && predicate(functor[j - 1], functor[j])) j++
    result.push(slice(i, j, functor) as T[] & string)
    i = j
  }
  return result
}

export const groupWith: GroupWith = curryN(2, _groupWith)
