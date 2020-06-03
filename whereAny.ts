import { ObjRec, Curry2, Tests } from "./utils/types.ts"
import curryN from "./utils/curry_n.ts"

function _whereAny(specs: Tests, obj: ObjRec) {
  for(const key in specs) {
    const pred = specs[key]
    const value = obj[key]
    if(
      Object.prototype.hasOwnProperty.call(specs, key)
      && pred(value)
    ) return true
  }
  return false
}


/**
 * Takes a specs objects whose each of the spec's own properties is a predicate function
 * Each predicate is applied to the value of the corresponding property of the
 * test object. Returns `true` if any of the predicates is satisfied, `false` otherwise.
 * **NOTE** returns `false` if there is no predicated functions
 * 
 * 
 *      const equals = curry(2, (x: number, y: number) => x === y)
 *      const spec = {x: equals(0), y: equals(20)}
 *      Fae.whereAny(spec, {x: 0, y: 200}) // true
 *      Fae.whereAny(spec, {x: 0, y: 10}) // true
 *      Fae.whereAny(spec, {x: 1, y: 101}) // false
 *      Fae.whereAny(spec, {x: 1, y: 2}) // true
 */
export const whereAny: Curry2<Tests, ObjRec, boolean> = curryN(2, _whereAny)
