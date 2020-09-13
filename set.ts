import type { Lens } from "./lens.ts"
import type { PH } from "./utils/types.ts"
import { over } from "./over.ts"
import { always } from "./always.ts"
import curryN from "./utils/curry_n.ts"

// @types
type Set_1<T, F> = ((lens: Lens<T, F>) => T)
  & ((lens?: PH) => Set_1<T, F>)

type Set_2<T, F> = ((value: F) => T)
  & ((value?: PH) => Set_2<T, F>)

type Set_3<T, F> = ((target: T) => T)
  & ((target?: PH) => Set_3<T, F>)

type Set_2_3<T, F> = ((value: F, target: T) => T)
  & ((value: F, target?: PH) => Set_3<T, F>)
  & ((value: PH, target: T) => Set_2<T, F>)
  & ((value?: PH, target?: PH) => Set_2_3<T, F>)

type Set_1_3<F> = (<T>(lens: Lens<T, F>, target: T) => T)
  & (<T>(lens: Lens<T, F>, target?: PH) => Set_3<T, F>)
  & (<T>(lens: PH, target: T) => Set_1<T, F>)
  & ((lens?: PH, target?: PH) => Set_1_3<F>)

type Set_1_2<T> = (<F>(lens: Lens<T, F>, value: F) => T)
  & (<F>(lens: Lens<T, F>, value?: PH) => Set_2<T, F>)
  & (<F>(lens: PH, value: F) => Set_1<T, F>)
  & ((lens?: PH, value?: PH) => Set_1_2<T>)

type Set = (<T, F>(lens: Lens<T, F>, value: F, target: T) => T)
  & ((lens?: PH, value?: PH, target?: PH) => Set)
  & (<T, F>(lens: Lens<T, F>, value?: PH, target?: PH) => Set_2_3<T, F>)
  & (<F>(lens: PH, value: F, target?: PH) => Set_1_3<F>)
  & (<T>(lens: PH, value: PH, target: T) => Set_1_2<T>)
  & (<T, F>(lens: Lens<T, F>, value: F, target?: PH) => Set_3<T, F>)
  & (<T, F>(lens: Lens<T, F>, value: PH, target: T) => Set_2<T, F>)
  & (<T, F>(lens: PH, value: F, target: T) => Set_1<T, F>)


function _set<T, F>(lens: Lens<T, F>, value: F, target: T) {
  return over(lens, always(value), target)
}

/**
 * Returns the result of "setting" the portion of the given data structure `target`
 * focused by the given `len`s to the given `value`.
 * 
 *      const xLens = Fae.lensProp('x')
 *      Fae.set(xLens, 4, {x: 1, y: 2})  //=> {x: 4, y: 2}
 *      Fae.set(xLens, 8, {x: 1, y: 2})  //=> {x: 8, y: 2}
 */
export const set: Set = curryN(3, _set)
