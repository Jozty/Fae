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

export const empty: Curry1<any> = curryN(1, _empty)
