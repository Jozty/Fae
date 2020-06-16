import { isArrayLike, isIterable, isIterator } from "./utils/is.ts"
import { getIterator, getTransformer } from "./utils/get.ts"
import curryN from "./utils/curry_n.ts"
import { Func, FunctorWithArLk, Curry } from "./utils/types.ts"
import Transformer, { ReducedTransformer } from "./utils/Transformers/transformers.ts"
import { throwFunctorError } from "./utils/throw.ts"

function _arrayReduce<T, R = T>(trans: Transformer, acc: R, list: ArrayLike<T>) {
  for(let i = 0, l = list.length; i < l; i++) {
    acc = trans.step(acc, list[i])
    if(acc && acc instanceof ReducedTransformer) {
      acc = acc.value
      break
    }
  }
  return trans.result(acc)
}

function _iterableReduce<T, R = T>(trans: Transformer, acc: R, it: Iterator<T>) {
  let step = it.next()
  while(!step.done) {
    acc = trans.step(acc, step.value)
    if(acc && acc instanceof ReducedTransformer) {
      acc = acc.value
      break
    }
    step = it.next()
  }
  return trans.result(acc)
}

function _reduce<T, R = T>(func: Func | Transformer, acc: R, functor: FunctorWithArLk<T>): R {
  let trans = getTransformer(func)
  if(isArrayLike(functor)) return _arrayReduce(trans, acc, functor)
  if(isIterable(functor)) return _iterableReduce(trans, acc, getIterator<T>(functor))
  if(isIterator(functor)) return _iterableReduce(trans, acc, functor)

  throwFunctorError()
}

/**
 * Returns a single value by iterating though `functor`
 * calling the iterator function `func`. `func` takes two arguments.
 * First - `acc`, Second - `value`.
 * 
 * It may stop the reduction in between by means of `ReducedTransformer`.
 * 
 * Acts as a transducer if a transformer is given in `functor`.
 * 
 * Works on array-like/iterable/iterator
 */
export const reduce: Curry<typeof _reduce> = curryN(3, _reduce)
