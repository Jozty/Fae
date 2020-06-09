import { Curry1 } from './utils/types.ts'
import curryN from './utils/curry_n.ts'
import { isArray, isString, isObject, isArguments } from './utils/is.ts'

function _empty(x: any) {
  return (
    (x != null && typeof x.empty === 'function')
      ? x.empty()
      : (x != null && x.constructor != null && typeof x.constructor.empty === 'function')
        ? x.constructor.empty()
        : isArray(x)
          ? []
          : isString(x)
            ? ''
            : isObject(x)
              ? {}
              : isArguments(x)
                ? (function() { return arguments }())
                : void 0  // else
  )
}


/**
 * Returns the empty value of its argument's type. 
 * Dispatches to the `empty` method of the first argument, if present.
 * 
 *      Fae.empty(Just(42))      //=> Nothing()
 *      Fae.empty([1, 2, 3])     //=> []
 *      Fae.empty('unicorns')    //=> ''
 *      Fae.empty({x: 1, y: 2})  //=> {}
 */
export const empty: Curry1<any> = curryN(1, _empty)
