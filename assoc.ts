import { ObjRec, Curry } from "./utils/types.ts"
import curryN from "./utils/curry_n.ts"

function _assoc(prop: string | number, val: any, obj: ObjRec) {
  const result: ObjRec = {}

  for (let p in obj) result[p] = obj[p]

  result[prop] = val
  return result
}

/**
 * Makes a shallow clone of `obj`, setting or overriding the specified
 * property `prop` with the given `val`. All non-primitive properties are
 * copied by reference.
 * 
 *      Fae.assoc('c', 3, {a: 1, b: 2}); //=> {a: 1, b: 2, c: 3}
 */
export const assoc: Curry<typeof _assoc> = curryN(3, _assoc)
