import curryN from "./utils/curry_n.ts"
import { Curry2, ObjRec, Obj } from "./utils/types.ts"
import where from "./where.ts"
import map from "./map.ts"
import equals from './equals.ts'

function whereEq(spec: ObjRec, testObj: ObjRec) {
  return where(map(equals, spec), testObj)
}

/**
 * Takes a spec object and a test object, returns true if the test satisfies
 * the spec, false otherwise.
 * `whereEq` is a specialization of [`where`].
 * 
 *      const pred = Fae.whereEq({a: 1, b: 2})
 *
 *      pred({a: 1})              //=> false
 *      pred({a: 1, b: 2})        //=> true
 *      pred({a: 1, b: 2, c: 3})  //=> true
 *      pred({a: 1, b: 1})        //=> false
 */
export default curryN(2, whereEq) as Curry2<ObjRec, ObjRec, boolean>