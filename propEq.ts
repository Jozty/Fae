import curryN from "./utils/curry_n.ts"
import { Curry3, ObjRec } from "./utils/types.ts"
import { equals } from './equals.ts'

function _propEq(name: string, val: any, obj: ObjRec) {
  return equals(val, obj[name])
}

/**
 * Returns `true` if the specified object property is equal, to the given value; `false` otherwise.
 *
 *      const shivam = {name: 'shivam', age: 20, hair: 'brown'}
 *      const shubham = {name: 'shubham', age: 22, hair: 'black'}
 *      const Krish = {name: 'krish', age: 25, hair: 'black'}
 *      const students = [shivam, shubham, krish]
 *      const hasBrownHair = Fae.propEq('hair', 'brown')
 *      Fae.filter(hasBrownHair, students) //=> [shubham] 
 */
export const propEq: Curry3<string, any, ObjRec, boolean> = curryN(3, _propEq)