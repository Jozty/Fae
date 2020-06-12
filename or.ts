import curryN from "./utils/curry_n.ts"
import { Curry2 } from "./utils/types.ts"

function _or(a: any, b: any){
  return a || b
}

/**
 * Returns `true` if one or both of its arguments are `true`. Returns `false`
 * if both arguments are `false`.
 * 
 *      Fae.or(true, true)    //=> true
 *      Fae.or(true, false)   //=> true
 *      Fae.or(false, true)   //=> true
 *      Fae.or(false, false)  //=> false
 */
export const or: Curry2<any> = curryN(2, _or)