import type { PH } from './utils/types.ts'
import curryN from './utils/curry_n.ts'

// @types
type LensF_2<T, F> = (setter: LensSetter<T, F>) => Lens<T, F>

type LensF_1<T, F> = (getter: LensGetter<T, F>) => Lens<T, F>

// prettier-ignore
type LensF =
  & (<T, F>(getter: LensGetter<T, F>, setter?: PH) => LensF_2<T, F>)
  & (<T, F>(getter: PH, setter: LensSetter<T, F>) => LensF_1<T, F>)
  & (<T, F>(getter: LensGetter<T, F>, setter: LensSetter<T, F>) => Lens<T, F>)

export type LensGetter<T, F> = (target: T) => F

export type LensSetter<T, F> = (focus: F, target: T) => T

export type GetTransformer<T, F, R> = (focus: F) => LensTransformer<T, F, R>

export type LensTransformer<T, F, R> = {
  value: F,
  transform: (setter: LensSetter<T, F>, target: T) => LensTransformer<never, R, never>
}

export type Lens<T, F> = <R>(
  getTransformer: GetTransformer<T, F, R>,
) => (target: T) => LensTransformer<never, R, never>

function _lens<T, F>(
  getter: LensGetter<T, F>,
  setter: LensSetter<T, F>,
): Lens<T, F> {
  return function <R>(getTransformer: GetTransformer<T, F, R>) {
    return function (target: T) {
      const focusedObj = getter(target)
      const transformer = getTransformer(focusedObj)
      return transformer.transform(setter, target)
    }
  }
}

/**
 * Returns a lens for the given getter and setter functions. The `getter` "gets"
 * the value of the focus; the setter "sets" the value of the focus. The `setter`
 * should not mutate the data structure.
 */
export const lens: LensF = curryN(2, _lens)
