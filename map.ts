import { isFunction, isObject, isArray } from "./utils/is.ts"
import {  Func, Curry2, Obj } from "./utils/types.ts"
import curryN from "./utils/curry_n.ts"
import reduce from "./reduce.ts"
import { dispatch } from "./utils/dispatch.ts"
import MapTransformer from "./utils/Transformers/map.ts"

function _functionMap(fn: Func, functor: Func) {
  return curryN(functor.length, function () {
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
  return [...functor].map(func)
}

function map<T>(fn: Func, functor: Object | Func | Array<T>) {
  if(isFunction(functor)) return _functionMap(fn, functor)
  if(isObject(functor)) return _objectMap(fn, functor)
  if(isArray(functor)) return _arrayMap(fn, functor)
}

const dispatchedMap = dispatch(MapTransformer, map)

export default curryN(2, dispatchedMap) as Curry2<Func, Object | Func | Array<any>, any>
