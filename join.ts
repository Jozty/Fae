// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import { reduce } from './reduce.ts'

import type { PH, FunctorWithArLk, EmptyObj } from './utils/types.ts'
import curryN from './utils/curry_n.ts'
import {
  isArray,
  isIterable,
  isIterator,
  isArrayLike,
  isNotUndefinedOrNull,
} from './utils/is.ts'
import { throwFunctorError } from './utils/throw.ts'

// @types
type Join_2 = <T>(functor: FunctorWithArLk<T>) => string

type Join_1<T> = (separator: string | number) => string

// prettier-ignore
type Join =
  & ((separator: string | number) => Join_2)
  & (<T>(separator: PH, functor: FunctorWithArLk<T>) => Join_1<T>)
  & (<T>(separator: string | number, functor: FunctorWithArLk<T>,) => string)

function _arrayJoin<T>(separator: string, list: Array<T>) {
  return list.join(separator)
}

function _join<T extends EmptyObj>(
  separator: string | number,
  functor: FunctorWithArLk<T>,
) {
  const sep = separator.toString()

  if (isArray(functor)) {
    return _arrayJoin(sep, functor.filter(isNotUndefinedOrNull))
  }

  if (
    isIterable(functor) ||
    isIterator(functor) ||
    isArrayLike(functor)
  ) {
    return reduce(
      (acc: string, value: T) => {
        return isNotUndefinedOrNull(value)
          ? acc + (acc ? sep : '') + value.toString()
          : acc
      },
      '',
      functor,
    )
  }
  throwFunctorError()
}

/**
 * Returns a string made by inserting the `separator` between each element and
 * concatenating all the elements into a single string.
 * The functor may be array-like/iterable/iterator.
 */
export const join: Join = curryN(2, _join)
