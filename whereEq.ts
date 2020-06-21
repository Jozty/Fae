import curryN from "./utils/curry_n.ts"
import {Curry, ObjRec, Tests} from "./utils/types.ts"
import { where } from "./where.ts"
import { map } from "./map.ts"
import { equals } from './equals.ts'

function _whereEq<T>(spec: ObjRec<T>, testObj: ObjRec<T>) {
  return where(map(equals, spec) as Tests, testObj)
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
export const whereEq: Curry<typeof _whereEq> = curryN(2, _whereEq)