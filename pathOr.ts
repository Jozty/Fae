import { Curry3, Obj } from "./utils/types.ts"
import curryN from "./utils/curry_n.ts"
import { defaultTo } from './defaultTo.ts'
import { path } from './path.ts'

function _pathOr(d: any, p: Array<any>, obj: any) {
  return defaultTo(d, path(p, obj))
}

/**
 * If the given, non-null object has a value at the given path, returns the
 * value at that path. Otherwise returns the provided default value.
 * 
 * 
 *      Fae.pathOr('N/A', ['a', 'b'], {a: {b: 2}}); //=> 2
 *      Fae.pathOr('N/A', ['a', 'b'], {c: {b: 2}}); //=> "N/A"
 */
export const pathOr: Curry3<any, Array<any>, any, any> = curryN(3, _pathOr)