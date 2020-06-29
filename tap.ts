import { PH } from "./utils/types.ts"
import { dispatch } from "./utils/dispatch.ts"
import curryN from "./utils/curry_n.ts"
import TapTransformer from "./utils/Transformers/tap.ts"

// @types
type Tap_2<T> = ((obj: T) => T)
  & ((obj?: PH) => Tap_2<T>)

type Tap_1<T> = ((func: (obj : T) => any) => T)
  & ((func?: PH) => Tap_1<T>)

type Tap = (<T>(func: (obj : T) => any, obj: T) => T)
  & (<T>(func: (obj : T) => any, obj?: PH) => Tap_2<T>)
  & (<T>(func: PH, obj: T) => Tap_1<T>)
  & ((func?: PH, obj?: PH) => Tap)

function _tap<T>(func: (obj : T) => any, obj: T) {
  func(obj)
  return obj
}

const dispatchedTap = dispatch(TapTransformer, _tap)

/** Runs the given function `func` with the supplied object `obj`, then returns `obj`. */
export const tap: Tap = curryN(2, dispatchedTap)
