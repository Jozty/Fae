import curryN from './utils/curry_n.ts'
import { PH, Comparator } from "./utils/types.ts"

// @types
type Sort_2<T> = ((list: T[]) => T[])
  & ((list?: PH) => Sort_2<T>)

type Sort_1<T> = ((comparator: Comparator<T>) => T[])
  & ((comparator?: PH) => Sort_1<T>)

type Sort = (<T>(comparator: Comparator<T>, list: T[]) => T[])
  & (<T>(comparator: Comparator<T>, list?: PH) => Sort_2<T>)
  & (<T>(comparator: PH, list: T[]) => Sort_1<T>)
  & ((comparator?: PH, list?: PH) => Sort)

function _sort<T>(comparator: Comparator<T>, list: T[]) {
  return [...list].sort(comparator)
}

/**
 * Returns a copy of the list, sorted according to the comparator function,
 * which should accept two values at a time and return a negative number if the
 * first value is smaller, a positive number if it's larger, and zero if they
 * are equal.
 * 
 * It does not modify the original.
 */
export const sort: Sort = curryN(2, _sort)