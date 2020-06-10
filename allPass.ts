import curryN from "./utils/curry_n.ts"
import { Curry1, Func } from "./utils/types.ts"
import { max } from './max.ts'
import { pluck } from './pluck.ts'
import { reduce } from './reduce.ts'


function _allPass(preds: Array<any>) {
  let len = preds.length
  let fn = function(this: any) {
    for(let idx = 0; idx < len; idx++){
      if (!preds[idx].apply(this, arguments)) {
        return false
      }
    }
    return true
  }
  return curryN(reduce(max, 0, pluck('length', preds)), fn)
}

/**
 * Takes a list of predicates and returns a predicate that returns true for a
 * given list of arguments if every one of the provided predicates is satisfied
 * by those arguments.
 *
 */
export const allPass: Curry1<Array<any>, Func> = curryN(1, _allPass)