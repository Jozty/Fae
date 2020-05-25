import { Func } from "./utils/types.ts"
import curryN from "./utils/curry_n.ts"
import reduce from "./reduce.ts"
import { getFunctionLength } from "./utils/get.ts"

function _pipe(f: Func, g: Func) {
  return function(this: any) {
    return g.call(this, f.apply(this, [...arguments]))
  }
}

export default function pipe(func: Func, ...functions: Func[]) {
  return curryN(
    getFunctionLength(func)!,
    reduce(_pipe, func, functions)
  )
}
