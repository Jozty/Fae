import curryN from './utils/curry_n.ts'
import type { PH, Obj, Tests, Func } from './utils/types.ts'
import { whereAll } from './whereAll.ts'
import { map } from './map.ts'
import { equals } from './equals.ts'

// @types
type WhereEq_2<T> = ((testObj: Obj<T>) => boolean)

type WhereEq_1<T> = ((spec: Obj<T>) => boolean)

// prettier-ignore
type WhereEq = (<T>(spec: Obj<T>, testObj: Obj<T>) => boolean)
  & (<T>(spec: Obj<T>, testObj?: PH) => WhereEq_2<T>)
  & (<T>(spec: PH, testObj: Obj<T>) => WhereEq_1<T>)
  & (<T>(spec: Obj<T>, testObj: Obj<T>) => boolean)

function _whereEq<T>(spec: Obj<T>, testObj: Obj<T>) {
  return whereAll(
    (map(equals as Func, spec) as unknown) as Tests<T>,
    testObj,
  )
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
