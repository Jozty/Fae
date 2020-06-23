import { Path, getPath } from "./paths.ts"
import { tail } from "./tail.ts"
import { assoc } from "./assoc.ts"
import has from "./utils/has.ts"
import { isNotUndefinedOrNull, isInteger, isArray } from "./utils/is.ts"
import curryN from "./utils/curry_n.ts"
import {Curry, ObjRec} from "./utils/types.ts"

function _assocPath<T>(path: Path, val: T, obj: ObjRec): ObjRec {
  if(path.length === 0) return val
  const p = getPath(path)

  const prop = p[0]

  if(p.length > 1) {
    const child = isNotUndefinedOrNull(obj) && has(obj, prop)
      ? obj[prop]
      : isInteger(prop)
        ? []
        : {}

    val = _assocPath(tail(p) as Path, val, child) as T
  }

  if(isInteger(prop) && isArray(obj)) {
    const result: any[] = [...obj]
    result[prop] = val
    return result
  }

  return assoc(prop, val, obj)

}


/**
 * Makes a shallow clone of an object, setting or overriding the nodes required
 * to create the given path, and placing the specific value at the tail end of
 * that path. Note that this copies and flattens prototype properties onto the
 * new object as well. All non-primitive properties are copied by reference.
 * 
 *      Fae.assocPath(['a', 'b', 'c'], 42, {a: {b: {c: 0}}}); //=> {a: {b: {c: 42}}}
 *      Fae.assocPath(['a', 'b', 'c'], 42, {a: 5}); //=> {a: {b: {c: 42}}}
 *
 */ 
export const assocPath: Curry<typeof _assocPath> = curryN(3, _assocPath)
