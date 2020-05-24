import { Func } from "./utils/types.ts"
import curryN from "./utils/curry_n.ts"
import reduce from "./reduce.ts"

function _pipe(f: Func, g: Func) {
  return function() {
    return g.call(this, f.apply(this, arguments))
  }
}

export default function pipe(func: Func, ...functions: Func[]) {
  return curryN(
    func.length,
    reduce(_pipe, functions, func)
  )
}
