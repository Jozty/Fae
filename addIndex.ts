import { concat } from './concat.ts'
import { Curry } from "./utils/types.ts"
import curryN from './utils/curry_n.ts'
import { Func } from './utils/types.ts'
import { getFunctionLength } from "./utils/get.ts"

function _addIndex(fn: Func) {
  const f = function(this: any) {
    let index = 0
    const origFn = arguments[0]
    const list = arguments[arguments.length - 1]
    const args = [...arguments]

    args[0] = function() {
      let result = origFn.apply(this, concat([...arguments], [index, list]))
      index += 1
      return result
    }

    return fn.apply(this,args)
  }

  return curryN(getFunctionLength(fn), f)
}


/**
 * Returns a new iteration function from the passed function
 * by adding two more parameters to its callback function
 * 1. the current index
 * 2. the entire list
 * The passed function must have first argument as the iteration functions
 * and last arguments as the list
 * 
 *      const indexedMap = Fae.addIndex(Fae.map)
 *      indexedMap((val, idx) => idx + '-' + val, ['f', 'o', 'o', 'b', 'a', 'r'])
 *      // ['0-f', '1-o', '2-o', '3-b', '4-a', '5-r']
 */
export const addIndex: Curry<typeof _addIndex> = curryN(1, _addIndex)
