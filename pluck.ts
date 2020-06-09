import curryN from "./utils/curry_n.ts"
import { Functor, Curry2 } from "./utils/types.ts"
import { map } from './map.ts'
import { prop } from './prop.ts'

function _pluck(p: number | string, list: Array<any> | Functor) {
  return map(prop(p), list)
}

/**
 * Returns a new list by plucking the same named property off all objects in
 * the list supplied.
 *
 *      let getAges = Fae.pluck('age')
 *      getAges([{name: 'shubham', age: 22}, {name: 'shivam', age: 23}]) //=> [22, 23]
 *
 *      Fae.pluck(0, [[1, 2], [3, 4]])               //=> [1, 3]
 *      Fae.pluck('val', {a: {val: 3}, b: {val: 5}}) //=> {a: 3, b: 5}
 */
export const pluck: Curry2<number | string, Array<any> | Functor> = curryN(2, _pluck)