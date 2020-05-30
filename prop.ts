import { ObjRec, Curry2 } from "./utils/types.ts"
import { isUndefinedOrNull, isInteger, isArrayLike } from "./utils/is.ts"
import nth from './nth.ts'
import curryN from "./utils/curry_n.ts"

function prop<T = any>(p: string | number, obj: ObjRec | ArrayLike<T>) {
  if(isUndefinedOrNull(obj)) return
  // @ts-ignore
  return isInteger(p) && isArrayLike(obj) ? nth(p, obj) : obj[p]
}

/**
 * Returns a property `p` on the `obj` if exists
 * @function
 */
export default curryN(2, prop) as Curry2<string | number, ObjRec | ArrayLike<any>, any>
