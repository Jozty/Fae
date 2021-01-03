// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import curryN from './utils/curry_n.ts'
import { sum } from './sum.ts'

// @types
type Mean = (list: number[]) => number

function _mean(list: number[]) {
  return sum(list) / list.length
}

/**
 * Returns the mean of the given list of numbers.
 */
export const mean: Mean = curryN(1, _mean)
