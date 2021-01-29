// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import curryN from './utils/curry_n.ts'
import type { PH, InferType } from './utils/types.ts'
import { isArray, isString } from './utils/is.ts'

// @types
// prettier-ignore
type Concat_2<L extends any[] | string> = (b: L) => InferType<L>

// prettier-ignore
type Concat_1<L extends any[] | string> = (a: L) => InferType<L>

// prettier-ignore
type Concat =
  & (<L extends any[] | string>(a: L, b?: PH) => Concat_2<InferType<L>>)
  & (<L extends any[] | string>(a: PH, b: L) => Concat_1<InferType<L>>)
  & (<L extends any[] | string>(a: L, b: L) => InferType<L>)

function _concat<L extends any[] | string, T>(a: L, b: L): L {
  if (isArray<T>(a) && isArray<T>(b)) return a.concat(b) as L
  if (isString(a) && isString(b)) return (a + b) as L
  throw new TypeError(
    'Types are not compatible. Both the arguments passed must be of same type.',
  )
}

/**
 * Concat two arrays or strings.
 * Both the arguments passed must be of same type.
 */
export const concat: Concat = curryN(2, _concat)
