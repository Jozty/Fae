// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import { isFunction, isObject, isArray } from './utils/is.ts'
import type {
  Func,
  PH,
  Obj,
  FuncArr1,
  InferType,
  InferElementType,
} from './utils/types.ts'
import curryN from './utils/curry_n.ts'
import { reduce } from './reduce.ts'
import { dispatch } from './utils/dispatch.ts'
import MapTransformer from './utils/Transformers/map.ts'
import { getFunctionLength } from './utils/get.ts'

// @types
// prettier-ignore
type MapReturnType<F, R> = F extends any[]
  ? R[]
  : F extends Func
  ? Func
  : F extends Obj<any>
  ? Obj<R>
  : never

type MapInferType<F> = F extends Func
  ? Func
  : F extends Obj<infer U>
  ? Obj<U>
  : InferType<F>

type MapInferElementType<F> = F extends Func
  ? Func
  : F extends Obj<infer U>
  ? U
  : InferElementType<F>

// prettier-ignore
type Map_2<T, R> = (<F extends Obj<T> | Func | T[]>(functor: F) => MapReturnType<F, R>)

// prettier-ignore
type Map_1<F extends Obj<any> | Func | any[]> = (<R>(fn: FuncArr1<MapInferElementType<F>, R>) => MapReturnType<F, R>)

// prettier-ignore
type Map =
  & (<T, R>(fn: FuncArr1<T, R>, functor?: PH) => Map_2<T, R>)
  & (<F extends Obj<any> | Func | any[]>(fn: PH, functor: F) => Map_1<F>)
  & (<F extends Obj<T> | Func | T[], T, R>(fn: FuncArr1<T, R>, functor: F) => MapReturnType<F, R>)

function _functionMap<T, R>(fn: FuncArr1<T, R>, functor: Func): Func {
  return curryN(getFunctionLength(functor), function (
    this: any,
    ...args: any[]
  ) {
    return fn.call(this, functor.apply(this, args))
  })
}

function _objectMap<T, R>(
  func: FuncArr1<T, R>,
  functor: Obj<T>,
): Obj<R> {
  return reduce(
    (acc: Obj, key: string) => {
      acc[key] = func(functor[key])
      return acc
    },
    {},
    Object.keys(functor),
  )
}

function _arrayMap<T, R>(func: FuncArr1<T, R>, functor: T[]) {
  const len = functor.length
  const result: R[] = new Array(len)
  for (let i = 0; i < len; i++) {
    result[i] = func(functor[i])
  }
  return result
}

function _map<F extends Obj<T> | Func | T[], T, R>(
  fn: FuncArr1<T, R>,
  functor: F,
): MapReturnType<F, R> {
  if (isFunction(functor)) return _functionMap(fn, functor) as any
  if (isArray(functor)) return _arrayMap(fn, functor) as any
  if (isObject(functor)) return _objectMap(fn, functor as any) as any
  throw new TypeError(
    'Functor can be only array, object or a transformer',
  )
}

const dispatchedMap = dispatch(MapTransformer, _map)

/**
 * Applies `fn` to each of `functor`'s value
 * and returns functor of same shape
 *
 * Acts as a transducer if a transformer is given in `functor`.
 */
export const map: Map = curryN(2, dispatchedMap)
