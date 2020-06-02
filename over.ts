import { Lens, GetTransformer, LensTransformer } from "./lens.ts"
import curryN from "./utils/curry_n.ts"
import { FuncArr1, Curry3 } from "./utils/types.ts"

const _overTransformer: GetTransformer = (focus: any) => ({
  value: focus,
  func: function(this: any) { return this },
})

function over(lens: Lens, fn: FuncArr1, target: any) {
  function _overTransformer(focus: any): LensTransformer {
    return {
      value: focus,
      func: function(setter: (focus: any) => any) {
        const changed = fn(focus)
        return setter(changed)
      }
    }
  }
  return lens(_overTransformer)(target)
}

export default curryN(3, over) as Curry3<Lens, FuncArr1, any, any>
