import curryN from './utils/curry_n.ts'
import { Curry2, Func, Comparator } from "./utils/types.ts"

function sort<T>(comparator: Comparator<T>, list: T[]) {
  return [...list].sort(comparator)
}

/** Returns a copy of the list, sorted according to the comparator function,
 * which should accept two values at a time and return a negative number if the
 * first value is smaller, a positive number if it's larger, and zero if they
 * are equal.
 * 
 * It does not modify the original.
 * @function */
export default curryN(2, sort) as Curry2<Comparator<any>, any[], any[]>