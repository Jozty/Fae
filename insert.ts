// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import curryN from './utils/curry_n.ts'
import type { PH } from './utils/types.ts'

// @types
type Insert_1<T> = (index: number) => T[]

type Insert_2<T> = (element: T) => T[]

type Insert_3<T> = (list: T[]) => T[]

// prettier-ignore
type Insert_2_3 =
  & (<T>(element: T) => Insert_3<T>)
  & (<T>(element: PH, list: T[]) => Insert_2<T>)
  & (<T>(element: T, list: T[]) => T[])

// prettier-ignore
type Insert_1_3<T> =
  & ((index: number) => Insert_3<T>)
  & (<T>(index: PH, list: T[]) => Insert_1<T>)
  & ((index: number, list: T[]) => T[])

// prettier-ignore
type Insert_1_2<T> =
  & ((index: number) => Insert_2<T>)
  & ((index: PH, element: T) => Insert_1<T>)
  & ((index: number, element: T) => T[])

// prettier-ignore
type Insert =
  & ((index: number) => Insert_2_3)
  & (<T>(index: PH, element: T) => Insert_1_3<T>)
  & (<T>(index: PH, element: PH, list: T[]) => Insert_1_2<T>)
  & (<T>(index: number, element: T) => Insert_3<T>)
  & (<T>(index: number, element: PH, list: T[]) => Insert_2<T>)
  & (<T>(index: PH, element: T, list: T[]) => Insert_1<T>)
  & (<T>(index: number, element: T, list: T[]) => T[])

function _insert<T>(index: number, element: T, list: T[]) {
  index = index < list.length && index >= 0 ? index : list.length
  const result = [...list]
  result.splice(index, 0, element)
  return result
}

/**
 * Returns a new array with `element` inserted at `index` to `list`
 * without affecting original one.
 */
export const insert: Insert = curryN(3, _insert)
