import curryN from './utils/curry_n.ts'
import type { Func, Predicate, PH } from './utils/types.ts'
import { getFunctionsLengths } from './utils/get.ts'

// @types
type AllPass = (<T>(predicates: Predicate<T>[]) => Func) &
  ((predicates?: PH) => AllPass)

function _allPass<T = any>(predicates: Predicate<T>[]) {
  const len = predicates.length
  const fn = function (this: any, ...args: T[]) {
    for (let idx = 0; idx < len; idx++) {
      if (!predicates[idx].apply(this, args)) {
        return false
      }
    }
    return true
  }

  const noOfParams = getFunctionsLengths(predicates)

  return curryN(Math.max(...noOfParams, 0), fn)
}

/**
 * Takes a list of predicates and returns a predicate that returns true for a
 * given list of arguments if every one of the provided predicates is satisfied
 * by those arguments.
 *
 */
export const allPass: AllPass = curryN(1, _allPass)
