import { isFunction, isObject, isArray } from "./utils/is.ts"
import {  Func, Curry2, Obj } from "./utils/types.ts"
import curryN from "./utils/curry_n.ts"
import { reduce } from "./reduce.ts"
import { dispatch } from "./utils/dispatch.ts"
import MapTransformer from "./utils/Transformers/map.ts"
import { getFunctionLength } from "./utils/get.ts"

function _functionMap(fn: Func, functor: Func) {
  return curryN(getFunctionLength(functor), function () {
    // @ts-ignore
    return fn.call(this, functor.apply(this, arguments))
  })
}

function _objectMap(func: Func, functor: Obj) {
  return reduce((acc: Obj, key: string) => {
    acc[key] = func(functor[key])
    return acc
  }, {}, Object.keys(functor))
}

function _arrayMap<T>(func: Func, functor: Array<T>) {
  const len = functor.length
  const result = new Array(len)
  for(let i = 0; i < len; i++) {
    result[i] = func(functor[i])
  }
  return result
}

function _map<T>(fn: Func, functor: Object | Func | Array<T>) {
  if(isFunction(functor)) return _functionMap(fn, functor)
  if(isObject(functor)) return _objectMap(fn, functor)
  if(isArray(functor)) return _arrayMap(fn, functor)
  throw new TypeError('Functor can be only array, object or a transformer')
}

const dispatchedMap = dispatch(MapTransformer, _map)

/**
 * Applies `fn` to each of `functor`'s value
 * and returns functor of same shape
 *
 * Acts as a transducer if a transformer is given in `functor`.
 */
export const map: Curry2<Func, Object | Func | Array<any>, any> = curryN(2, dispatchedMap)
