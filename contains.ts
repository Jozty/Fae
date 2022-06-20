// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import curryN from './utils/curry_n.ts'
import type { PH } from './utils/types.ts'

// TODO: write transformer

// @types
type Contains_2<T> = (list: ArrayLike<T>) => boolean

type Contains_1<T> = (element: T) => boolean

// prettier-ignore
type Contains =
  & (<T>(element: T) => Contains_2<T>)
  & (<T>(element: PH, list: ArrayLike<T>) => Contains_1<T>)
  & (<T>(element: T, list: ArrayLike<T>) => boolean)

function _contains<T>(element: T, list: ArrayLike<T>) {
  let index = 0
  while (index < list.length) {
    if (list[index] === element) return true
    index++
  }
  return false
}

/**
 * Returns `true` or `false` based on the element found or not.
 */
export const contains: Contains = curryN(2, _contains)
