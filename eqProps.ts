import { Curry3, Obj } from "./utils/types.ts"
import curryN from "./utils/curry_n.ts"
import { equals } from "./equals.ts"

function _eqProps(prop: string, obj1: Obj, obj2: Obj) {
  return equals(obj1[prop], obj2[prop])
}


/**
 * Reports whether two objects have the same value, for the specified property. 
 * Useful as a curried predicate.
 * 
 *      const obj1 = { a: 1, b: 2, c: 3, d: 4 }
 *      const obj2 = { a: 10, b: 20, c: 3, d: 40 }
 *      Fae.eqProps('a', obj1, obj2) //=> false
 *      Fae.eqProps('c', obj1, obj2) //=> true
 */
export const eqProps: Curry3<string, Obj, Obj, boolean> = curryN(3, _eqProps)
