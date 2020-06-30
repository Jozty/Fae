import { Lens, GetTransformer, LensTransformer } from "./lens.ts"
import curryN from "./utils/curry_n.ts"
import { PH } from "./utils/types.ts"

// @types
type View_2<T, F> = ((target: T) => F)
  & ((target?: PH) => View_2<T, F>)

type View_1<T> = (<F>(lens: Lens<T, F>) => F)
  & ((lens?: PH) => View_1<T>)

type View = (<T, F>(lens: Lens<T, F>, target: T) => F)
  & (<T, F>(lens: Lens<T, F>, target?: PH) => View_2<T, F>)
  & (<T>(lens: PH, target: T) => View_1<T>)
  & ((lens?: PH, target?: PH) => View)

function _viewTransformer<T, F>(focus: F) {
  return {
    value: focus,
    func: function(this: LensTransformer<never, F, never>) { return this },
  }
}

function _view<T, F>(lens: Lens<T, F>, target: T) {
  return lens(_viewTransformer)(target).value
}

export const view: View = curryN(2, _view)
