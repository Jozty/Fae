import curryN from "./utils/curry_n.ts"
import { Curry1, Func } from "./utils/types.ts"
import { max } from './max.ts'
import { pluck } from './pluck.ts'
import { reduce } from './reduce.ts'

function _anyPass(preds: any) {
  return curryN(reduce(max, 0, pluck('length', preds)), function(this: any) {
    for(let idx = 0; idx < preds.length; idx++){
      if (preds[idx].apply(this, arguments)) {
        return true
      }
    }
    return false
  })
}

/**
 * Takes a list of predicates and returns a predicate that returns true for a
 * given list of arguments if at least one of the provided predicates is
 * satisfied by those arguments.
 */
export const anyPass: Curry1<any, Func> = curryN(1, _anyPass)