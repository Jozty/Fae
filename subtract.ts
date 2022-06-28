// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import curryN from './utils/curry_n.ts'
import type { PH } from './utils/types.ts'

// @types
type Subtract_2 = (b: number) => number

type Subtract_1 = (a: number) => number

// prettier-ignore
type Subtract =
  & ((a: number) => Subtract_2)
  & ((a: PH, b: number) => Subtract_1)
  & ((a: number, b: number) => number)

function _subtract(a: number, b: number) {
  return a - b
}

/** Subtracts its second argument from its first argument. */
export const subtract: Subtract = curryN(2, _subtract)
