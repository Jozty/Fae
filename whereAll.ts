import { ObjRec, Curry2, Tests } from "./utils/types.ts"
import curryN from "./utils/curry_n.ts"
import has from "./utils/has.ts"

function whereAll(specs: Tests, obj: ObjRec) {
  let count = 0
  for(const key in specs) {
    count++
    const pred = specs[key]
    const value = obj[key]
    if(
      has(specs, key)
      && !pred(value)
    ) return false
  }
  return count !== 0
}

/** Takes a specs objects whose each of the spec's own properties is a predicate function
 * Each predicate is applied to the value of the corresponding property of the
 * test object. Returns `true` if all the predicates are satisfied, `false` otherwise.
 * **NOTE** returns `false` if there is no predicated functions
 * @function
 * 
 *      const equals = curry(2, (x: number, y: number) => x === y)
 *      const spec = {x: equals(100), y: equals(20)}
 *      Fae.whereAll(spec, {x: 0, y: 200}) // false
 *      Fae.whereAll(spec, {x: 0, y: 10}) // false
 *      Fae.whereAll(spec, {x: 0, y: 2}) // true
 *      Fae.whereAll(spec, {x: 1, y: 2}) // false
*/
export default curryN(2, whereAll) as Curry2<Tests, ObjRec, boolean>
