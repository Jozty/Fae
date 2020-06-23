import curryN from "./utils/curry_n.ts"
import { Curry } from "./utils/types.ts"

function _always<T>(value: T) {
  return function() {
    return value
  }
}

/**
 * Returns a function which that always returns `value`
 * 
 *      const f = Fae.always('Fae')
 *      f() // 'Fae'
 */
export const always: Curry<typeof _always> = curryN(1, _always)
