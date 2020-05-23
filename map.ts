import { isFunction, isObject, isArray } from "./utils/is.ts"
import {  Func, Curry2 } from "./utils/types.ts"
import curryN from "./utils/curry_n.ts"
import reduce from "./reduce.ts"

function _functionMap(fn: Func, functor: Func) {
  return curryN(functor.length, () => {
    return fn.call(this, functor.apply(this, arguments))
  })
}

function _objectMap(func: Func, functor: Object) {
  return reduce((acc: Object, key: string) => {
    acc[key] = func(functor[key])
    return acc
  }, Object.keys(functor), {})
}

function _arrayMap<T>(func: Func, functor: Array<T>) {
  return [...functor].map(func)
}

function map<T>(fn: Func, functor: Object | Func | Array<T>) {
  if(isFunction(functor)) return _functionMap(fn, functor)
  if(isObject(functor)) return _objectMap(fn, functor)
  if(isArray(functor)) return _arrayMap(fn, functor)
}

export default curryN(2, map) as Curry2<Func, Object | Func | Array<unknown>, unknown>
