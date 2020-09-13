import curryN from "./utils/curry_n.ts"
import type { PH } from "./utils/types.ts"

// @types
type Always = (<T>(value: T) => () => T)
  & ((value?: PH) => Always)

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
export const always: Always = curryN(1, _always)
