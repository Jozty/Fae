import {Curry, Obj, ObjRec} from './utils/types.ts'
import curryN from './utils/curry_n.ts'

export type LensTarget<F> = Obj<F> | ObjRec<F> | F[]

/** Getter for the lens */
export type Getter<F> = (target: LensTarget<F>) => F

/** Setter for the lens */
export type Setter<F, R = any> = (focus: F, target: LensTarget<F>) => R

/**
 * The function which is passed to the `Lens`.
 * It accepts one argument `focus` - the focused object
 * It returns `LensTransformer` type object
 */
export type GetTransformer<F, R> = (focus: F) => LensTransformer<F, R>

/**
 * @property value
 * @property {(fn: (focus: F) => R) => LensTransformer<R, never>} func - function that is called during transformation.
 * a setter function is passed to it whose first argument which is to set to the `target`
 */
export type LensTransformer<F, R> = {
  value: F,
  func: (fn: (focus: F) => R) => LensTransformer<R, never>
}

export type SeenGetTransformer<F, R> = (target: LensTarget<F>) => LensTransformer<R, never>

/**
 * Lens function which takes `GetTransformer` and returns `SeenGetTransformer`
 */
export type Lens<F, R = any> = (getTransformer: GetTransformer<F, R>) => SeenGetTransformer<F, R>

function _lens<F>(getter: Getter<F>, setter: Setter<F>): Lens<F> {
  return function <R>(getTransformer: GetTransformer<F, R>): SeenGetTransformer<F, R> {
    return function (target: LensTarget<F>) {
      const focusedObj = getter(target)
      const transformer: LensTransformer<F, R> = getTransformer(focusedObj)

      const setterFunc = (focus: F) => setter(focus, target)
      return transformer.func(setterFunc) 
    }
  }
}

/**
 * Returns a lens for the given getter and setter functions. The `getter` "gets"
 * the value of the focus; the setter "sets" the value of the focus. The `setter`
 * should not mutate the data structure.
 */
export const lens: Curry<typeof _lens> = curryN(2, _lens)
