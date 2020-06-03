import { Curry2 } from './utils/types.ts'
import curryN from './utils/curry_n.ts'

/** Getter for the lens */
export type Getter<T> = (target: any) => T

/** Setter for the lens */
export type Setter<T> = (focus: T, target: any) => any

/**
 * The function which is passed to the `Lens`.
 * It accepts one argument `focus` - the focused object
 * It returns `LensTransformer` type object
 */
export type GetTransformer<T = any> = (focus: T) => LensTransformer<T>

/**
 * @property value
 * @property {(fn: (focus: any) => any) => any} func - function that is called during transformation.
 * a setter function is passed to it whose first argument which is to set to the `target`
 */
export type LensTransformer<T = any> = {
  value: T,
  func: (fn: (focus: any) => any) => any
}

export type SeenGetTransformer = (target: any) => any

/**
 * Lens function which takes `GetTransformer` and returns `SeenGetTransformer`
 */
export type Lens<T = any> = (getTransformer: GetTransformer<T>) => SeenGetTransformer

function _lens<T = any>(getter: Getter<T>, setter: Setter<T>): Lens {
  return function (getTransformer: GetTransformer<T>): SeenGetTransformer {
    return function (target: any) {
      const focusedObj = getter(target)
      const transformer: LensTransformer<T> = getTransformer(focusedObj)

      const setterFunc = (focus: T) => setter(focus, target)
      return transformer.func(setterFunc) 
    }
  }
}

/**
 * Returns a lens for the given getter and setter functions. The `getter` "gets"
 * the value of the focus; the setter "sets" the value of the focus. The `setter`
 * should not mutate the data structure.
 */
export const lens: Curry2<Getter<any>, Setter<any>, Lens> = curryN(2, _lens)
