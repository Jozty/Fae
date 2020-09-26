import type { FunctorWithArLk, PH } from './utils/types.ts'
import {
  isArrayLike,
  isIterable,
  isIterator,
  isString,
} from './utils/is.ts'
import { getIterable } from './utils/get.ts'
import { throwFunctorError } from './utils/throw.ts'
import curryN from './utils/curry_n.ts'

// @types
// prettier-ignore
type NthReturnType<F, T> = F extends string
  ? string
  : T

// prettier-ignore
type Nth_2 = (<F extends FunctorWithArLk<T> | string, T>(functor: F) => NthReturnType<F, T>)
  & ((functor?: PH) => Nth_2)

// prettier-ignore
type Nth_1<F extends FunctorWithArLk<T> | string, T> = ((index: number) => T)
  & ((index?: PH) => Nth_1<F, T>)

// prettier-ignore
type Nth = (<F extends FunctorWithArLk<T> | string, T>(index: number, functor: F) => NthReturnType<F, T>)
  & ((index: number, functor?: PH) => Nth_2)
  & (<F extends FunctorWithArLk<T> | string, T>(index: PH, functor: F) => Nth_1<F, T>)
  & ((index?: PH, functor?: PH) => Nth)


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
