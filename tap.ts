import { Curry2 } from "./utils/types.ts"
import { dispatch } from "./utils/dispatch.ts"
import curryN from "./utils/curry_n.ts"
import TapTransformer from "./utils/Transformers/tap.ts"

function _tap<T>(func: (obj : T) => void, obj: T) {
  func(obj)
  return obj
}

const dispatchedTap = dispatch(TapTransformer, _tap)

/** Runs the given function `func` with the supplied object `obj`, then returns `obj`. */
export const tap: Curry2<(obj : any) => void, any, any> = curryN(2, dispatchedTap)
