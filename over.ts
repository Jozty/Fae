import type { Lens, LensTransformer } from "./lens.ts"
import curryN from "./utils/curry_n.ts"
import type { FuncArr1, PH } from "./utils/types.ts"

// @types
type Over_1<T, R> = ((lens: Lens<T, R>) => T)
  & ((lens?: PH) => Over_1<T, R>)

type Over_2<T, R> = ((fn: FuncArr1<R, R>) => T)
  & ((fn?: PH) => Over_2<T, R>)

type Over_3<T, R> = ((target: T) => T)
  & ((target?: PH) => Over_3<T, R>)

type Over_2_3<T, R> = ((fn: FuncArr1<R, R>, target: T) => T)
  & ((fn: FuncArr1<R, R>, target?: PH) => Over_3<T, R>)
  & ((fn: PH, target: T) => Over_2<T, R>)
  & ((fn?: PH, target?: PH) => Over_2_3<T, R>)

type Over_1_3<R> = (<T>(lens: Lens<T, R>, target: T) => T)
  & (<T>(lens: Lens<T, R>, target?: PH) => Over_3<T, R>)
  & (<T>(lens: PH, target: T) => Over_1<T, R>)
  & ((lens?: PH, target?: PH) => Over_1_3<R>)

type Over_1_2<T> = (<R>(lens: Lens<T, R>, fn: FuncArr1<R, R>) => T)
  & (<R>(lens: Lens<T, R>, fn?: PH) => Over_2<T, R>)
  & (<R>(lens: PH, fn: FuncArr1<R, R>) => Over_1<T, R>)
  & ((lens?: PH, fn?: PH) => Over_1_2<T>)

type Over = (<T, R>(lens: Lens<T, R>, fn: FuncArr1<R, R>, target: T) => T)
  & ((lens?: PH, fn?: PH, target?: PH) => Over)
  & (<T, R>(lens: Lens<T, R>, fn?: PH, target?: PH) => Over_2_3<T, R>)
  & (<R>(lens: PH, fn: FuncArr1<R, R>, target?: PH) => Over_1_3<R>)
  & (<T>(lens: PH, fn: PH, target: T) => Over_1_2<T>)
  & (<T, R>(lens: Lens<T, R>, fn: FuncArr1<R, R>, target?: PH) => Over_3<T, R>)
  & (<T, R>(lens: Lens<T, R>, fn: PH, target: T) => Over_2<T, R>)
  & (<T, R>(lens: PH, fn: FuncArr1<R, R>, target: T) => Over_1<T, R>)



function _overTransformer<T, F>(focus: F): LensTransformer<T, F, T> {
  return {
    value: focus,
    func: function(setter: (focus: F) => T) {
      return _overTransformer(setter(focus))
    }
  }
}

function _over<T, R>(lens: Lens<T, R>, fn: FuncArr1<R, R>, target: T) {
  return lens(
    (focus: R) => _overTransformer(fn(focus))
  )(target).value
}

/** 
 * Returns the result of "setting" the portion of the given data structure `target`
 * focused by the given `lens` to the result of applying the given function `fn` to
 * the focused value.
 * 
 *      const headLens = Fae.lensIndex(0)
 *      R.over(headLens, (x: string) => x.toUpperCase(), ['foo', 'bar', 'baz']) //=> ['FOO', 'bar', 'baz']
 */

export const over: Over = curryN(3, _over)
