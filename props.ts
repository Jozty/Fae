import { ObjRec, Curry2 } from "./utils/types.ts"
import { prop } from './prop.ts'
import curryN from "./utils/curry_n.ts"

function _props<T = any>(p: Array<string | number>, obj: ObjRec | ArrayLike<T>) {
  return p.map(a => prop(a, obj))
}

/** Returns an array of multiple on the `obj`. Order is preserved. */
export const props: Curry2<Array<string | number>, ObjRec | ArrayLike<any>, any[]> = curryN(2, _props)
