import { ObjRec, Curry } from "./utils/types.ts"
import { isUndefinedOrNull, isInteger, isArrayLike } from "./utils/is.ts"
import { nth } from './nth.ts'
import curryN from "./utils/curry_n.ts"

function _prop<T = any>(p: string | number, obj: ObjRec | ArrayLike<T>): T | undefined {
  if(isUndefinedOrNull(obj)) return
  if(isArrayLike(obj)) {
    if (isInteger(p)) return nth(p, obj) as T
  }
  return (obj as ObjRec)[p] as T
}

/** Returns a property `p` on the `obj` if exists */
export const prop: Curry<typeof _prop> = curryN(2, _prop)
