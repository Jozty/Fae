import curryN from "./utils/curry_n.ts"
import { PH, Obj, Tests, Func } from "./utils/types.ts"
import { where } from "./where.ts"
import { map } from "./map.ts"
import { equals } from './equals.ts'

// @types
type WhereEq_2<T> = ((testObj: Obj<T>) => boolean)
  & ((testObj?: PH) => WhereEq_2<T>)

type WhereEq_1<T> = ((spec: Obj<T>) => boolean)
  & ((spec?: PH) => WhereEq_1<T>)

type WhereEq = (<T>(spec: Obj<T>, testObj: Obj<T>) => boolean)
  & (<T>(spec: Obj<T>, testObj?: PH) => WhereEq_2<T>)
  & (<T>(spec: PH, testObj: Obj<T>) => WhereEq_1<T>)
  & ((spec?: PH, testObj?: PH) => WhereEq)

function _whereEq<T>(spec: Obj<T>, testObj: Obj<T>) {
  return where(map(equals as Func, spec) as unknown as Tests<T>, testObj)
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
export const whereEq: WhereEq = curryN(2, _whereEq)