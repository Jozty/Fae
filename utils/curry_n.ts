import { isPlaceHolder } from "./is_placeholder.ts"
import { _, UNDEFINED } from "./constants.ts"
import type { Func } from "./types.ts"
import { setFunctionLength } from "./set.ts"

function _curryN<F extends (...args: any[]) => any>(totalArgs: number, received: Parameters<F>, original: F) {
  function f(this: any, ...passed: any[]) {
    const allArgs = [...received] as Parameters<F>
    let allArgsI = 0
    let i = 0
    while(i < passed.length && allArgsI < totalArgs) {
      if(allArgs[allArgsI] !== UNDEFINED) {
        allArgsI++
        continue
      }
      if(!isPlaceHolder(passed[i])) allArgs[allArgsI] = passed[i]
      i++
      allArgsI++
    }
    return allArgs.every(r => r !== UNDEFINED)
      ? original.apply(this, allArgs)
      : _curryN(totalArgs, allArgs, original)
  }
  let rem = received.filter(r => r === UNDEFINED).length
  setFunctionLength(f, rem)
  return f
}

export default function curryN<F extends Func>(totalArgs: number, original: F) {
  const received = new Array(totalArgs).fill(UNDEFINED) as Parameters<F>
  return _curryN(totalArgs, received, original)
}
