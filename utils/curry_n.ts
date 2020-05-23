import { isPlaceHolder } from "./is_placeholder.ts"
import { _ } from "./constants.ts"
import { Func } from "./types"

function _curryN<F extends (...args: any[]) => any>(totalArgs: number, received: Parameters<F>, original: F) {
  return function f(this: any, ...passed: any[]) {
    const allArgs = new Array(totalArgs).fill(void 0) as Parameters<F>
    let allArgsI = 0
    let i = 0
    let rem = totalArgs
    while(allArgsI < totalArgs) {
      let r: any = void 0
      if(received[allArgsI] !== void 0) r = received[allArgsI]
      else if(!isPlaceHolder(passed[i])) r = passed[i++]
      else i++
      allArgs[allArgsI++] = r
      if(r !== void 0) rem--
    }
    return rem <= 0
      ? original.apply(this, allArgs)
      : _curryN(totalArgs, allArgs, original)
  }  
}

export default function curryN<F extends Func>(totalArgs: number, original: F) {
  const received = new Array(totalArgs).fill(void 0) as Parameters<F>
  return _curryN(totalArgs, received, original)
}
