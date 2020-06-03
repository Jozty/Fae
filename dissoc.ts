import { ObjRec, Curry2 } from "./utils/types.ts"
import curryN from "./utils/curry_n.ts"

function dissoc(prop: string | number, obj: ObjRec) {
  const result: ObjRec = {}

  for (let p in obj) result[p] = obj[p]

  delete result[prop]
  return result
}

/** Makes a shallow clone of `obj`, deleting `props` from the new object.
 * All non-primitive properties are copied by reference.
 * 
 *      Fae.dissoc('b', {a: 1, b: 2, c: 3}); //=> {a: 1, c: 3}
 */
export default curryN(2, dissoc) as Curry2<string | number, ObjRec, ObjRec>
