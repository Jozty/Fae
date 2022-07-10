// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import { isArrayLike, isIterable, isIterator } from './utils/is.ts';
import { getIterator, getTransformer } from './utils/get.ts';
import curryN from './utils/curry_n.ts';
import type { FuncArr2, FunctorWithArLk, PH } from './utils/types.ts';
import {
  AbstractTransformer,
  ReducedTransformer,
} from './utils/Transformers/transformers.ts';
import { throwFunctorError } from './utils/throw.ts';

// @types
type Reducer<R, T> =
  | FuncArr2<R, T, R | ReducedTransformer<R>>
  | AbstractTransformer<R, T>;

type Reduce_1<R, T> = (func: Reducer<R, T>) => R;

type Reduce_2<R> = (acc: R) => R;

type Reduce_3<R, T> = (functor: FunctorWithArLk<T>) => R;

type Reduce_2_3<R, T> =
  & ((acc: R) => Reduce_3<R, T>)
  & (<T>(acc: PH, functor: FunctorWithArLk<T>) => Reduce_2<R>)
  & (<T>(acc: R, functor: FunctorWithArLk<T>) => R);

type Reduce_1_3<R> =
  & (<T>(func: Reducer<R, T>) => Reduce_3<R, T>)
  & (<T>(func: PH, functor: FunctorWithArLk<T>) => Reduce_1<R, T>)
  & (<T>(func: Reducer<R, T>, functor: FunctorWithArLk<T>) => R);

type Reduce_1_2<T> =
  & (<R>(func: Reducer<R, T>) => Reduce_2<R>)
  & (<R>(func: PH, acc: R) => Reduce_1<R, T>)
  & (<R>(func: Reducer<R, T>, acc: R) => R);

type Reduce =
  & (<R, T>(func: Reducer<R, T>) => Reduce_2_3<R, T>)
  & (<R>(func: PH, acc: R) => Reduce_1_3<R>)
  & (<T>(func: PH, acc: PH, functor: FunctorWithArLk<T>) => Reduce_1_2<T>)
  & (<R, T>(func: Reducer<R, T>, acc: R) => Reduce_3<R, T>)
  & (<R, T>(
    func: Reducer<R, T>,
    acc: PH,
    functor: FunctorWithArLk<T>,
  ) => Reduce_2<R>)
  & (<R, T>(func: PH, acc: R, functor: FunctorWithArLk<T>) => Reduce_1<R, T>)
  & (<R, T>(func: Reducer<R, T>, acc: R, functor: FunctorWithArLk<T>) => R);

function _arrayReduce<R, T>(
  trans: AbstractTransformer<R, T>,
  acc: R,
  list: ArrayLike<T>,
): R {
  for (let i = 0, l = list.length; i < l; i++) {
    const reducedAcc = trans.step(acc, list[i]);
    if (reducedAcc && reducedAcc instanceof ReducedTransformer) {
      acc = reducedAcc.value;
      break;
    } else {
      acc = reducedAcc;
    }
  }

  return trans.result(acc) as R;
}

function _iterableReduce<R, T>(
  trans: AbstractTransformer<R, T>,
  acc: R,
  it: Iterator<T>,
): R {
  let step = it.next();
  while (!step.done) {
    const reducedAcc = trans.step(acc, step.value);
    if (reducedAcc && reducedAcc instanceof ReducedTransformer) {
      acc = reducedAcc.value;
      break;
    } else {
      acc = reducedAcc;
    }
    step = it.next();
  }

  return trans.result(acc) as R;
}

function _reduce<R, T>(
  func: Reducer<R, T>,
  acc: R,
  functor: FunctorWithArLk<T>,
): R {
  const trans = getTransformer<R, T>(func);

  if (isArrayLike(functor)) return _arrayReduce<R, T>(trans, acc, functor);
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
export const reduce = curryN(3, _reduce) as Reduce;
