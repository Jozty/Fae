import { PH } from './utils/types.ts'
import curryN from './utils/curry_n.ts'

// @types
type LensF_2<T, F> = ((setter: Setter<T, F>) => Lens<T, F>)
  & ((setter?: PH) => LensF_2<T, F>)

type LensF_1<T, F> = ((getter: Getter<T, F>) => Lens<T, F>)
  & ((getter?: PH) => LensF_1<T, F>)

type LensF = (<T, F>(getter: Getter<T, F>, setter: Setter<T, F>) => Lens<T, F>)
  & (<T, F>(getter: Getter<T, F>, setter?: PH) => LensF_2<T, F>)
  & (<T, F>(getter: PH, setter: Setter<T, F>) => LensF_1<T, F>)
  & ((getter?: PH, setter?: PH) => LensF)

/** Getter for the lens */
export type Getter<T, F> = (target: T) => F

/** Setter for the lens */
export type Setter<T, F> = (focus: F, target: T) => T

/**
 * The function which is passed to the `Lens`.
 * It accepts one argument `focus` - the focused object
 * It returns `LensTransformer` type object
 */
export type GetTransformer<T, F, R> = (focus: F) => LensTransformer<T, F, R>

/**
 * @property value
 * @property {(fn: (focus: any) => any) => any} func - function that is called during transformation.
 * a setter function is passed to it whose first argument which is to set to the `target`
 */
export type LensTransformer<T, F, R> = {
  value: F,
  func: (fn: (focus: F) => T) => LensTransformer<never, R, never>
}

export type SeenGetTransformer<T, R> = (target: T) => LensTransformer<never, R, never>

/**
 * Lens function which takes `GetTransformer` and returns `SeenGetTransformer`
 */
export type Lens<T, F> = <R>(getTransformer: GetTransformer<T, F, R>) => SeenGetTransformer<T, R>

function _lens<T, F>(getter: Getter<T, F>, setter: Setter<T, F>): Lens<T, F> {
  return function <R>(getTransformer: GetTransformer<T, F, R>): SeenGetTransformer<T, R> {
    return function (target: T) {
      const focusedObj = getter(target)
      const transformer = getTransformer(focusedObj)

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
export const lens: LensF = curryN(2, _lens)
