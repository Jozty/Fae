import curryN from "./utils/curry_n.ts"
import { PH, Obj, Predicate1 } from "./utils/types.ts"
import { complement } from './complement.ts'
import { filter } from './filter.ts'

// @types
type Reject_2<T> = ((filterable: T[] | Obj<T> | Obj<T>) => T[])
  & ((filterable?: PH) => Reject_2<T>)

type Reject_1<T> = ((predicate: Predicate1<T>) => T[])
  & ((predicate?: PH) => Reject_1<T>)

type Reject = (<T>(predicate: Predicate1<T>, filterable: T[] | Obj<T> | Obj<T>) => T[])
  & (<T>(predicate: Predicate1<T>, filterable?: PH) => Reject_2<T>)
  & (<T>(predicate: PH, filterable: T[] | Obj<T> | Obj<T>) => Reject_1<T>)
  & ((predicate?: PH, filterable?: PH) => Reject)

function _reject<T>(predicate: Predicate1<T>, filterable: T[] | Obj<T>) {
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
