// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import curryN from './utils/curry_n.ts'
import type { PH, Comparator } from './utils/types.ts'

// @types
type Sort_2<T> = (list: T[]) => T[]

type Sort_1<T> = (comparator: Comparator<T>) => T[]

// prettier-ignore
type Sort =
  & (<T>(comparator: Comparator<T>) => Sort_2<T>)
  & (<T>(comparator: PH, list: T[]) => Sort_1<T>)
  & (<T>(comparator: Comparator<T>, list: T[]) => T[])

function _sort<T>(comparator: Comparator<T>, list: T[]) {
  return [...list].sort(comparator)
}

/**
 * Returns a copy of the list, sorted according to the comparator function,
 * which should accept two values at a time and return a negative number if the
 * first value is smaller, a positive number if it's larger, and zero if they
 * are equal.
 *
 * It does not modify the original.
 */
export const sort: Sort = curryN(2, _sort)
