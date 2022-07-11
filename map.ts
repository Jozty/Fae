// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import { isArray, isFunction, isObject } from './utils/is.ts';
import type {
  Any,
  Func,
  FuncArr1,
  InferElementType,
  InferType,
  Obj,
  PH,
} from './utils/types.ts';
import curryN from './utils/curry_n.ts';
import { reduce } from './reduce.ts';
import { dispatch } from './utils/dispatch.ts';
import MapTransformer from './utils/Transformers/map.ts';
import { getFunctionLength } from './utils/get.ts';

// @types
type MapReturnType<F, R> = F extends unknown[] ? R[]
  : F extends Func<infer A> ? Func<A, R>
  : F extends Obj<unknown> ? Obj<R>
  : never;

type MapInferType<F> = F extends Func ? Func
  : F extends Obj<infer U> ? Obj<U>
  : InferType<F>;

type MapInferElementType<F> = F extends Func ? Func
  : F extends Obj<infer U> ? U
  : InferElementType<F>;

type Map_2<T, R> = <F extends Obj<T> | Func<A, T> | T[], T, A extends Any[]>(
  functor: F,
) => MapReturnType<F, R>;

type Map_1<F extends Obj<T> | Func<A, T> | T[], T, A extends Any[]> = <R>(
  fn: FuncArr1<MapInferElementType<F>, R>,
) => MapReturnType<F, R>;

type Map =
  & (<T, R>(fn: FuncArr1<T, R>) => Map_2<T, R>)
  & (<F extends Obj<T> | Func<A, T> | T[], T, A extends Any[]>(
    fn: PH,
    functor: F,
  ) => Map_1<F, T, A>)
  & (<F extends Obj<T> | Func<A, T> | T[], T, R, A extends Any[]>(
    fn: FuncArr1<T, R>,
    functor: F,
  ) => MapReturnType<F, R>);

function _functionMap<T, R, A extends Any[]>(
  fn: FuncArr1<T, R>,
  functor: Func<A, T>,
): Func {
  return curryN(getFunctionLength(functor), function (
    this: unknown,
    ...args: A
  ) {
    return fn.call(this, functor.apply(this, args));
  });
}

function _objectMap<T, R>(
  func: FuncArr1<T, R>,
  functor: Obj<T>,
): Obj<R> {
  return reduce(
    (acc: Obj<R>, key: string) => {
      acc[key] = func(functor[key]);
      return acc;
    },
    {},
    Object.keys(functor),
  );
}

function _arrayMap<T, R>(func: FuncArr1<T, R>, functor: T[]) {
  const len = functor.length;
  const result: R[] = new Array(len);
  for (let i = 0; i < len; i++) {
    result[i] = func(functor[i]);
  }
  return result;
}

function _map<F extends Obj<T> | Func<A, T> | T[], T, R, A extends Any[]>(
  fn: FuncArr1<T, R>,
  functor: F,
): MapReturnType<F, R> {
  // @ts-ignore: TODO
  if (isFunction(functor)) {
    // @ts-ignore: TODO
    return _functionMap(fn, functor) as MapReturnType<F, R>;
  }

  if (isArray(functor)) {
    return _arrayMap(fn, functor) as MapReturnType<F, R>;
  }

  if (isObject(functor)) {
    return _objectMap(fn, functor as Obj<T>) as MapReturnType<F, R>;
  }

  throw new TypeError(
    'Functor can be only array, object or a transformer',
  );
}

const dispatchedMap = dispatch(MapTransformer, _map);

/**
 * Applies `fn` to each of `functor`'s value
 * and returns functor of same shape
 *
 * Acts as a transducer if a transformer is given in `functor`.
 */
export const map = curryN(2, dispatchedMap) as Map;
