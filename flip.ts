import { Func } from './utils/types.ts'
import { getFunctionLength } from './utils/get.ts'
import curryN from './utils/curry_n.ts'

export default function flip(fn: Func) {
  return curryN(
    fn.length || getFunctionLength(fn)!,
    function (this: any, a: any, b: any, ...rest: any[]) {
      return fn.apply(this, [b, a, ...rest])
    } as typeof fn
  )
}
