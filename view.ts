import {Lens, LensTransformer, LensTarget, GetTransformer} from "./lens.ts"
import curryN from "./utils/curry_n.ts"
import { Curry } from "./utils/types.ts"

function _viewTransformer<F>(focus: F): LensTransformer<F, F> {
  return {
    value: focus,
    func: function(this: any) { return this },
  }
}

function _view<F>(lens: Lens<F>, target: LensTarget<F>): F {
  return lens(_viewTransformer as GetTransformer<F, F>)(target).value
}

export const view: Curry<typeof _view> = curryN(2, _view)
