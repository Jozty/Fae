import {Curry, ObjRec} from "./utils/types.ts"
import curryN from "./utils/curry_n.ts"
import { defaultTo } from './defaultTo.ts'
import { path } from './path.ts'
import { Path } from "./paths.ts"

function _pathOr(d: unknown, p: Path, obj: ObjRec) {
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
export const pathOr: Curry<typeof _pathOr> = curryN(3, _pathOr)