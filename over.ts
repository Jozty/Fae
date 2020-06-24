import {Lens, LensTarget, LensTransformer} from "./lens.ts"
import curryN from "./utils/curry_n.ts"
import { FuncArr1, Curry } from "./utils/types.ts"

function _overTransformer<F, R>(focus: F): LensTransformer<F, R> {
  return {
    value: focus,
    func: function(setter: (focus: F) => R) {
      return _overTransformer(setter(focus))
    }
  }
}

function _over<F, R>(lens: Lens<F>, fn: FuncArr1, target: LensTarget<F>): R {
  return lens(
    (focus: F) => _overTransformer<F, R>(fn(focus))
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
export const over: Curry<typeof _over> = curryN(3, _over)
