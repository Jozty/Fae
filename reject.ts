import curryN from "./utils/curry_n.ts"
import { Curry, Obj, Predicate1 } from "./utils/types.ts"
import { complement } from './complement.ts'
import { filter } from './filter.ts'

function _reject<T>(pred: Predicate1, filterable: Array<T> | Obj) {
  return filter(complement(pred), filterable)
}

/**
 * works as the complement of filter
 * 
 *      const isOdd = n => (n & 1) === 1;
 *      const f = Fae.reject(isOdd, [1, 2, 3, 4])
 *      f() // [2, 4]
 */
export const reject: Curry<typeof _reject> = curryN(2, _reject)
