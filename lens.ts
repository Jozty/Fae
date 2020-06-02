import { Func, Curry2 } from './utils/types.ts'
import curryN from './utils/curry_n.ts'


export type Getter<T> = (target: any) => T

export type Setter<T> = (focus: T, target: any) => any

export type LensTransformer<T = any> = {
  value: T,
  func: (fn: (focus: any) => any) => any
}

export type GetTransformer<T = any> = (focus: T) => LensTransformer<T>

export type SeenGetTransformer = (target: any) => any

export type Lens<T = any> = (getTransformer: GetTransformer<T>) => SeenGetTransformer

function lens<T = any>(getter: Getter<T>, setter: Setter<T>): Lens {
  return function (getTransformer: GetTransformer<T>): SeenGetTransformer {
    return function (target: any) {
      const focusedObj = getter(target)
      const transformer: LensTransformer<T> = getTransformer(focusedObj)

      const setterFunc = (focus: T) => setter(focus, target)
      return transformer.func(setterFunc) 
    }
  }
}

export default curryN(2, lens) as Curry2<Getter<any>, Setter<any>, Lens>
