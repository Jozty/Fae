// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import type {
  GetTransformer,
  Lens,
  LensSetter,
  LensTransformer,
} from './lens.ts'
import curryN from './utils/curry_n.ts'
import type { FuncArr1, PH } from './utils/types.ts'

// @types
type Over_1<T, F> = (lens: Lens<T, F>) => T

type Over_2<T, F> = (fn: FuncArr1<F, F>) => T

type Over_3<T, F> = (target: T) => T

// prettier-ignore
type Over_2_3<T, F> =
  & ((fn: FuncArr1<F, F>, target?: PH) => Over_3<T, F>)
  & ((fn: PH, target: T) => Over_2<T, F>)
  & ((fn: FuncArr1<F, F>, target: T) => T)

// prettier-ignore
type Over_1_3<F> =
  & (<T>(lens: Lens<T, F>, target?: PH) => Over_3<T, F>)
  & (<T>(lens: PH, target: T) => Over_1<T, F>)
  & (<T>(lens: Lens<T, F>, target: T) => T)

// prettier-ignore
type Over_1_2<T> =
  & (<F>(lens: Lens<T, F>, fn?: PH) => Over_2<T, F>)
  & (<F>(lens: PH, fn: FuncArr1<F, F>) => Over_1<T, F>)
  & (<F>(lens: Lens<T, F>, fn: FuncArr1<F, F>) => T)

// prettier-ignore
type Over =
  & (<T, F>(lens: Lens<T, F>, fn?: PH, target?: PH) => Over_2_3<T, F>)
  & (<F>(lens: PH, fn: FuncArr1<F, F>, target?: PH) => Over_1_3<F>)
  & (<T>(lens: PH, fn: PH, target: T) => Over_1_2<T>)
  & (<T, F>(lens: Lens<T, F>, fn: FuncArr1<F, F>, target?: PH) => Over_3<T, F>)
  & (<T, F>(lens: Lens<T, F>, fn: PH, target: T) => Over_2<T, F>)
  & (<T, F>(lens: PH, fn: FuncArr1<F, F>, target: T) => Over_1<T, F>)
  & (<T, F>(lens: Lens<T, F>, fn: FuncArr1<F, F>, target: T) => T)

function _overTransformer<T, F>(focus: F): LensTransformer<T, F, T> {
  return {
    value: focus,
    transform(setter, target) {
      return _overTransformer(setter(this.value, target))
    },
  }
}

function _over<T, F>(
  lens: Lens<T, F>,
  fn: FuncArr1<F, F>,
  target: T,
): T {
  return lens(((focus) =>
    _overTransformer(fn(focus))) as GetTransformer<T, F, T>)(target)
    .value
}

/**
 * Returns the result of "setting" the portion of the given data structure `target`
 * focused by the given `lens` to the result of applying the given function `fn` to
 * the focused value.
 *
 *      const headLens = Fae.lensIndex(0)
 *      Fae.over(headLens, (x: string) => x.toUpperCase(), ['foo', 'bar', 'baz']) // ['FOO', 'bar', 'baz']
 */

export const over: Over = curryN(3, _over)
