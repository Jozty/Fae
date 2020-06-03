import { Lens, LensTransformer } from "./lens.ts"
import curryN from "./utils/curry_n.ts"
import { FuncArr1, Curry3 } from "./utils/types.ts"

function _overTransformer(focus: any): LensTransformer {
  return {
    value: focus,
    func: function(setter: (focus: any) => any) {
      return _overTransformer(setter(focus))
    }
  }
}

function _over(lens: Lens, fn: FuncArr1, target: any) {
  return lens(
    (focus: any) => _overTransformer(fn(focus))
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
export const over: Curry3<Lens, FuncArr1, any, any> = curryN(3, _over)
