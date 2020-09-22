import type { Obj, PH, Tests } from './utils/types.ts'
import curryN from './utils/curry_n.ts'

// @types
// prettier-ignore
type WhereAll_2<T> =
  & ((testObj: Obj<T>) => boolean)
  & ((testObj?: PH) => WhereAll_2<T>)

// prettier-ignore
type WhereAll_1<T> =
  & ((specs: Tests<T>) => boolean)
  & ((specs?: PH) => WhereAll_1<T>)

// prettier-ignore
type WhereAll =
  & (<T>(specs: Tests<T>, testObj: Obj<T>) => boolean)
  & (<T>(specs: Tests<T>, testObj?: PH) => WhereAll_2<T>)
  & (<T>(specs: PH, testObj: Obj<T>) => WhereAll_1<T>)
  & ((specs?: PH, testObj?: PH) => WhereAll)

function _whereAll<T>(specs: Tests<T>, testObj: Obj<T>) {
  let count = 0
  for (const key in specs) {
    count++
    const pred = specs[key]
    const value = testObj[key]
    if (!pred(value)) return false
  }
  return count !== 0
}

/**
 * Takes a specs objects whose property is a predicate function
 * Each predicate is applied to the value of the corresponding property of the
 * test object. Returns `true` if all the predicates are satisfied, `false` otherwise.
 * **NOTE** returns `false` if there is no predicated functions
 *
 *
 *      const equals = curry(2, (x: number, y: number) => x === y)
 *      const spec = {x: equals(100), y: equals(20)}
 *      Fae.whereAll(spec, {x: 0, y: 200}) // false
 *      Fae.whereAll(spec, {x: 0, y: 10}) // false
 *      Fae.whereAll(spec, {x: 0, y: 2}) // true
 *      Fae.whereAll(spec, {x: 1, y: 2}) // false
 */
export const whereAll: WhereAll = curryN(2, _whereAll)
