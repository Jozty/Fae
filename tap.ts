import { Curry } from "./utils/types.ts"
import { dispatch } from "./utils/dispatch.ts"
import curryN from "./utils/curry_n.ts"
import TapTransformer from "./utils/Transformers/tap.ts"

function _tap(func: (obj : any) => any, obj: any) {
  func(obj)
  return obj
}

const dispatchedTap = dispatch(TapTransformer, _tap)

/** Runs the given function `func` with the supplied object `obj`, then returns `obj`. */
export const tap: Curry<typeof _tap> = curryN(2, dispatchedTap)
