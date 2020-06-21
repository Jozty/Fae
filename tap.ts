import { Curry } from "./utils/types.ts"
import { dispatch } from "./utils/dispatch.ts"
import curryN from "./utils/curry_n.ts"
import TapTransformer from "./utils/Transformers/tap.ts"

function _tap<T>(func: (obj : T) => void, obj: T) {
  func(obj)
  return obj
}

const dispatchedTap = dispatch(TapTransformer, _tap)

/** Runs the given function `func` with the supplied object `obj`, then returns `obj`. */
export const tap: Curry<typeof _tap> = curryN(2, dispatchedTap)
