// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import curryN from './utils/curry_n.ts'
import type { PH } from './utils/types.ts'

// @types
type Xor_2 = (b: any) => boolean

type Xor_1 = (a: any) => boolean

// prettier-ignore
type Xor =
  & ((a: any) => Xor_2)
  & ((a: PH, b: any) => Xor_1)
  & ((a: any, b: any) => boolean)

function _xor(a: any, b: any) {
  return Boolean(a ? !b : b)
}

/**
 * Exclusive Or - Returns `true` if one of the arguments is truthy and the other is falsy.
 * Otherwise, it returns `false`.
 *
 *      Fae.xor(true, true) //=> false
 *      Fae.xor(true, false) //=> true
 *      Fae.xor(false, true) //=> true
 *      Fae.xor(false, false) //=> false
 */
export const xor: Xor = curryN(2, _xor)
