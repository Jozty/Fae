import { ObjRec, Curry2 } from "./utils/types.ts"
import { isUndefinedOrNull, isInteger, isArrayLike } from "./utils/is.ts"
import { nth } from './nth.ts'
import curryN from "./utils/curry_n.ts"

function _prop<T = any>(p: string | number, obj: ObjRec | ArrayLike<T>) {
  if(isUndefinedOrNull(obj)) return
  // @ts-ignore
  return isInteger(p) && isArrayLike(obj) ? nth(p, obj) : obj[p]
}

/** Returns a property `p` on the `obj` if exists */
export const prop: Curry2<string | number, ObjRec | ArrayLike<any>, any> = curryN(2, _prop)
