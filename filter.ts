import type {
  FunctorWithArLk,
  PH,
  Obj,
  Predicate1,
} from './utils/types.ts'
import {
  isArrayLike,
  isArray,
  isIterable,
  isIterator,
  isObject,
} from './utils/is.ts'
import { reduce } from './reduce.ts'
import { throwFunctorError } from './utils/throw.ts'
import { dispatch } from './utils/dispatch.ts'
import FilterTransformer from './utils/Transformers/filter.ts'
import curryN from './utils/curry_n.ts'

// @types
type Filter_2<T> = ((
  functor: FunctorWithArLk<T> | Obj<T>,
) => T[] | Partial<Obj<T>>) &
  ((functor?: PH) => Filter_2<T>)

type Filter_1<T> = ((
  predicate: Predicate1<T>,
) => T[] | Partial<Obj<T>>) &
  ((predicate?: PH) => Filter_1<T>)

type Filter = (<T>(
  predicate: Predicate1<T>,
  functor: FunctorWithArLk<T> | Obj<T>,
) => T[] | Partial<Obj<T>>) &
  (<T>(predicate: Predicate1<T>, functor?: PH) => Filter_2<T>) &
  (<T>(
    predicate: PH,
    functor: FunctorWithArLk<T> | Obj<T>,
  ) => Filter_1<T>) &
  ((predicate?: PH, functor?: PH) => Filter)

function _objectFilter<T>(predicate: Predicate1<T>, functor: Obj<T>) {
  return reduce(
    (acc: Obj<T>, key: string) => {
      if (predicate(functor[key])) acc[key] = functor[key]
      return acc
    },
    {},
    Object.keys(functor),
  )
}

function _functorFilter<T>(
  predicate: Predicate1<T>,
  functor: FunctorWithArLk<T>,
): T[] {
  return reduce(
    (acc: T[], value: T) => {
      if (predicate(value)) acc.push(value)
      return acc
    },
    [],
    functor,
  )
}

function _filter<T = any>(
  predicate: Predicate1<T>,
  functor: FunctorWithArLk<T> | Obj<T>,
): T[] | Partial<Obj<T>> {
  if (isArray(functor)) return functor.filter(predicate)
  if (
    isArrayLike(functor) ||
    isIterable(functor) ||
    isIterator(functor)
  ) {
    return _functorFilter(predicate, functor)
  }
  if (isObject(functor)) return _objectFilter(predicate, functor)
  throw throwFunctorError()
}

const dispatchedFilter = dispatch(FilterTransformer, _filter)

/**
 * Filters the those elements from `functor` that satisfies `predicate`.
 * The `functor` may be an array/object/iterable/iterator.
 *
 * Acts as a transducer if a transformer is passed in place of `functor`
 */
export const filter: Filter = curryN(2, dispatchedFilter)
