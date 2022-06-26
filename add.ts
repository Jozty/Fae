// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import curryN from './utils/curry_n.ts'

// @types
type Add_2 = (b: number) => number

// prettier-ignore
type Add =
  & ((a: number) => Add_2)
  & ((a: number, b: number) => number)

function _add(a: number, b: number) {
  return a + b
}

/**
 * Adds two numbers
 *
 *      const add5 = Fae.add(5, Fae._)
 *      const a = add5(4) // 9
 */
export const add: Add = curryN(2, _add)
