import { Lens, GetTransformer } from "./lens.ts"
import curryN from "./utils/curry_n.ts"
import { Curry2 } from "./utils/types.ts"

const _viewTransformer: GetTransformer = (focus: any) => ({
  value: focus,
  func: function(this: any) { return this },
})

function view(lens: Lens, target: any) {
  return lens(_viewTransformer)(target).value
}

export default curryN(2, view) as Curry2<Lens, any, any>
