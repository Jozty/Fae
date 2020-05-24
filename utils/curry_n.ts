import { isPlaceHolder } from "./is_placeholder.ts"
import { _ } from "./constants.ts"
import { Func } from "./types.ts"
import { setFunctionLength } from "./set.ts"

function _curryN<F extends (...args: any[]) => any>(totalArgs: number, received: Parameters<F>, original: F) {
  function f(this: any, ...passed: any[]) {
    const allArgs = [...received] as Parameters<F>
    let allArgsI = 0
    let i = 0
    while(i < passed.length && allArgsI < totalArgs) {
      let r: any = void 0
      if(allArgs[allArgsI] !== void 0) {
        allArgsI++
        continue
      }
      if(!isPlaceHolder(passed[i])) allArgs[allArgsI] = passed[i]
      i++
    }
    return allArgs.every(r => r !== void 0)
      ? original.apply(this, allArgs)
      : _curryN(totalArgs, allArgs, original)
  }
  let rem = received.filter(r => r === void 0).length
  setFunctionLength(f, rem)
  return f
}

export default function curryN<F extends Func>(totalArgs: number, original: F) {
  const received = new Array(totalArgs).fill(void 0) as Parameters<F>
  return _curryN(totalArgs, received, original)
}
