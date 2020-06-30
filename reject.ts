import curryN from "./utils/curry_n.ts"
import { PH, Obj, Predicate1 } from "./utils/types.ts"
import { complement } from './complement.ts'
import { filter } from './filter.ts'

// @types
type Reject_2<T> = (<F extends T[] | Obj<T>>(filterable: F) => F)
  & ((filterable?: PH) => Reject_2<T>)

type Reject_1<F extends T[] | Obj<T>, T> = ((predicate: Predicate1<T>) => F)
  & ((predicate?: PH) => Reject_1<F, T>)

type Reject = (<F extends T[] | Obj<T>, T>(predicate: Predicate1<T>, filterable: F) => F)
  & (<T>(predicate: Predicate1<T>, filterable?: PH) => Reject_2<T>)
  & (<F extends T[] | Obj<T>, T>(predicate: PH, filterable: F) => Reject_1<F, T>)
  & ((predicate?: PH, filterable?: PH) => Reject)

function _reject<F extends T[] | Obj<T>, T>(predicate: Predicate1<T>, filterable: F) {
  return filter(complement(predicate), filterable)
}

/**
 * works as the complement of filter
 * 
 *      const isOdd = n => (n & 1) === 1;
 *      const f = Fae.reject(isOdd, [1, 2, 3, 4])
 *      f() // [2, 4]
 */
export const reject: Reject = curryN(2, _reject)
