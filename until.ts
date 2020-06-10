import curryN from './utils/curry_n.ts'
import { Func, Curry3, Predicate1 } from './utils/types.ts'

function _until(pred: Predicate1, fn: Func, init: any) {
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
export const until: Curry3<Predicate1, Func, any, any> = curryN(3, _until)
