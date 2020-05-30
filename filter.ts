import { FunctorWithArLk, Curry2, Obj } from './utils/types.ts'
import { isArrayLike, isArray, isIterable, isIterator, isObject } from './utils/is.ts'
import reduce from './reduce.ts'
import { throwFunctorError } from './utils/throw.ts'
import { dispatch } from './utils/dispatch.ts'
import FilterTransformer from './utils/Transformers/filter.ts'
import curryN from './utils/curry_n.ts'

type Predicate<T> = (a: T) => boolean

function _objectFilter<T>(predicate: Predicate<T>, functor: Obj<T>) {
  return reduce(
    (acc, key) => {
      if(predicate(functor[key])) acc[key] = functor[key]
      return acc
    },
    {},
    Object.keys(functor)
  )
}

function _functorFilter<T>(predicate: Predicate<T>, functor: FunctorWithArLk<T>) {
  return reduce(
    (acc, value) => {
      if(predicate(value)) acc.push(value)
      return acc
    },
    [],
    functor
  )
}

function filter<T = any>(predicate: Predicate<T>, functor: FunctorWithArLk<T> | Obj<T>): Array<T> {
  if(isArray(functor)) return functor.filter(predicate)
  if(
    isArrayLike(functor)
    || isIterable(functor)
    || isIterator(functor)) {
      return _functorFilter(predicate, functor)
  }
  if(isObject(functor)) return _objectFilter(predicate, functor)
  throw throwFunctorError()
}

const dispatchedFilter = dispatch(FilterTransformer, filter)

/** Filters the those elements from `functor` that satisfies `predicate`.
 * The `functor` may be an array/object/iterable/iterator.
 * 
 * Acts as a transducer if a transformer is passed in place of `functor` 
 * @function */
export default curryN(2, dispatchedFilter) as Curry2<Predicate<any>, FunctorWithArLk | Obj,  Array<any> | Object>

