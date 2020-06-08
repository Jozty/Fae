import curryN from "./utils/curry_n.ts"
import { Curry1, Func } from "./utils/types.ts"
import { max } from './max.ts'
import { pluck } from './pluck.ts'
import { reduce } from './reduce.ts'

function _anyPass(preds: any) {
  return curryN(reduce(max, 0, pluck('length', preds)), function(this: any) {
    let idx = 0
    let len = preds.length
    while (idx < len) {
      if (preds[idx].apply(this, arguments)) {
        return true
      }
      idx += 1
    }
    return false
  })
}

export const anyPass: Curry1<any, Func> = curryN(1, _anyPass)