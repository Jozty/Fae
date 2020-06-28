import { PH } from './utils/types.ts'
import curryN from './utils/curry_n.ts'
import { isArray, isString, isObject, isArguments } from './utils/is.ts'

// @types
type Empty = ((x: any) => boolean)
  & ((fn?: PH) => Empty)

function _empty(x: any) {
  if(x != null && typeof x.empty === 'function')  return x.empty()
  
  if(x != null && x.constructor != null && typeof x.constructor.empty === 'function') return  x.constructor.empty()
  
  if(isArray(x))  return []
  
  if(isString(x)) return ''
  
  if(isObject(x)) return {}
  
  if(isArguments(x))  return (function() { return arguments }())  
}


/**
 * Returns the empty value of its argument's type. 
 * Dispatches to the `empty` method of the first argument, if present.
 * 
 *      Fae.empty([1, 2, 3])     //=> []
 *      Fae.empty('unicorns')    //=> ''
 *      Fae.empty({x: 1, y: 2})  //=> {}
 */
export const empty: Empty = curryN(1, _empty)
