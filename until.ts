import curryN from './utils/curry_n.ts'
import { Curry, Predicate1 } from './utils/types.ts'

function _until<T>(pred: Predicate1<T>, fn: (a: T) => T, init: T): T {
  let val = init
  while (!pred(val)) {
    val = fn(val)
  }
  return val
}

/**
 * Takes a predicate, a transformation function, and an initial value,
 * and returns a value of the same type as the initial value.
 */
export const until: Curry<typeof _until> = curryN(3, _until)
