import concat from './utils/concat.ts'
import curryN from './utils/curry_n.ts'
import { Func } from './utils/types.ts'
import { getFunctionLength } from "./utils/get.ts"

function addIndexF(fn: Func) {
  return curryN(getFunctionLength(fn)!, function(this: any) {
    let index = 0
    let origFn = arguments[0]
    let list = arguments[arguments.length - 1]
    let args = [...arguments]
    args[0] = function() {
      let result = origFn.apply(this, concat(args, [index, list]))
      index += 1
      return result
    }
    return fn.apply(this,args)
  })
}

let addIndex = curryN(1, addIndexF)


export default addIndex