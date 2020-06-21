import curryN from './utils/curry_n.ts'
import { Curry, Comparator } from "./utils/types.ts"

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
export const sort: Curry<typeof _sort> = curryN(2, _sort)