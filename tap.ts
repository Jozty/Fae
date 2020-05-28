import { Func, Curry2 } from "./utils/types.ts"
import { dispatch } from "./utils/dispatch.ts"
import curryN from "./utils/curry_n.ts"
import TapTransformer from "./utils/Transformers/tap.ts"

function tap<T>(func: (obj : T) => void, obj: T) {
  func(obj)
  return obj
}

const dispatchedTap = dispatch(TapTransformer, tap)

export default curryN(2, dispatchedTap) as Curry2<Func, any, any>
