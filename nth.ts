// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import type { FunctorWithArLk, PH } from './utils/types.ts'
import {
  isArrayLike,
  isIterable,
  isIterator,
  isString,
} from './utils/is.ts'
import { getIterable } from './utils/get.ts'
import { throwFunctorError } from './utils/throw.ts'
import type { InferElementType } from './utils/types.ts'
import curryN from './utils/curry_n.ts'

// @types
// prettier-ignore
type Nth_2 = <F extends FunctorWithArLk | string>(functor: F,) => InferElementType<F>

// prettier-ignore
type Nth_1<F extends FunctorWithArLk | string> = (index: number) => InferElementType<F>

// prettier-ignore
type Nth =
  & ((index: number) => Nth_2)
  & (<F extends FunctorWithArLk | string>(index: PH, functor: F) => Nth_1<F>)
  & (<F extends FunctorWithArLk | string>(index: number, functor: F) => InferElementType<F>)

function _nth<F extends FunctorWithArLk<T> | string, T>(
  index: number,
  functor: F,
) {
  let f: ArrayLike<T> | string = ''
  if (isArrayLike(functor)) f = functor
  else if (isIterable(functor)) f = [...functor]
  else if (isIterator(functor)) f = [...getIterable(functor)]
  else if (isString(functor)) f = functor
  else throwFunctorError()

  index = index < 0 ? index + f.length : index
  return f[index] ? f[index] : isString(functor) ? '' : f[index]
}

/**
 * Returns `index`th element of `functor`.
 * Returns element counting from right end if `index` is -ve.
 * Works in array-like/string/iterable/iterator
 */
export const nth: Nth = curryN(2, _nth)
