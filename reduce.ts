// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import { isArrayLike, isIterable, isIterator } from './utils/is.ts';
import { getIterator, getTransformer } from './utils/get.ts';
import curryN from './utils/curry_n.ts';
import type { FuncArr2, FunctorWithArLk, PH } from './utils/types.ts';
import Transformer, {
  ReducedTransformer,
} from './utils/Transformers/transformers.ts';
import { throwFunctorError } from './utils/throw.ts';

// @types
type Reducer<R, P> =
  | FuncArr2<R, P, R | ReducedTransformer<R>>
  | Transformer;

type Reduce_1<T, R> = <P>(func: Reducer<R, P>) => R;

type Reduce_2<T, R, P> = (acc: R) => R;

type Reduce_3<R, P> = <T>(functor: FunctorWithArLk<T>) => R;

type Reduce_2_3<R, P> =
  & ((acc: R) => Reduce_3<R, P>)
  & (<T>(acc: PH, functor: FunctorWithArLk<T>) => Reduce_2<T, R, P>)
  & (<T>(acc: R, functor: FunctorWithArLk<T>) => R);

type Reduce_1_3<R> =
  & (<P>(func: Reducer<R, P>) => Reduce_3<R, P>)
  & (<T>(func: PH, functor: FunctorWithArLk<T>) => Reduce_1<T, R>)
  & (<T, P>(func: Reducer<R, P>, functor: FunctorWithArLk<T>) => R);

type Reduce_1_2<T> =
  & (<R, P>(func: Reducer<R, P>) => Reduce_2<T, R, P>)
  & (<R>(func: PH, acc: R) => Reduce_1<T, R>)
  & (<R, P>(func: Reducer<R, P>, acc: R) => R);

type Reduce =
  & (<R, P>(func: Reducer<R, P>) => Reduce_2_3<R, P>)
  & (<R>(func: PH, acc: R) => Reduce_1_3<R>)
  & (<T>(func: PH, acc: PH, functor: FunctorWithArLk<T>) => Reduce_1_2<T>)
  & (<R, P>(func: Reducer<R, P>, acc: R) => Reduce_3<R, P>)
  & (<T, R, P>(
    func: Reducer<R, P>,
    acc: PH,
    functor: FunctorWithArLk<T>,
  ) => Reduce_2<T, R, P>)
  & (<T, R>(func: PH, acc: R, functor: FunctorWithArLk<T>) => Reduce_1<T, R>)
  & (<T, R, P>(func: Reducer<R, P>, acc: R, functor: FunctorWithArLk<T>) => R);

function _arrayReduce<T, R>(
  trans: Transformer,
  acc: R,
  list: ArrayLike<T>,
): R {
  for (let i = 0, l = list.length; i < l; i++) {
    acc = trans.step(acc, list[i]);
    if (acc && acc instanceof ReducedTransformer) {
      acc = acc.value;
      break;
    }
  }
  return trans.result(acc);
}

function _iterableReduce<T, R>(
  trans: Transformer,
  acc: R,
  it: Iterator<T>,
): R {
  let step = it.next();
  while (!step.done) {
    acc = trans.step(acc, step.value);
    if (acc && acc instanceof ReducedTransformer) {
      acc = acc.value;
      break;
    }
    step = it.next();
  }
  return trans.result(acc);
}

function _reduce<T, R, P>(
  func: Reducer<R, P>,
  acc: R,
  functor: FunctorWithArLk<T>,
): R {
  let trans = getTransformer(func);
  if (isArrayLike(functor)) return _arrayReduce(trans, acc, functor);
  if (isIterable(functor)) {
    return _iterableReduce(trans, acc, getIterator<T>(functor));
  }
  if (isIterator(functor)) return _iterableReduce(trans, acc, functor);

  throwFunctorError();
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
export const reduce: Reduce = curryN(3, _reduce);
