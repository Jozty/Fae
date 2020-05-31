import curryN from "./utils/curry_n.ts"
import { Curry2, Func } from "./utils/types.ts"
import reduce from './reduce.ts'
import ap from './ap.ts'
import map from './map.ts'


//TODO: (ch-shubham) Testing 
function liftN(arity: number, fn: Func) {
  let lifted = curryN(arity, fn)
  let f = () => { return reduce(ap, map(lifted, arguments[0]), [ ...arguments ]) }
  return curryN(arity, f)
}

export default curryN(2, liftN) as Curry2<number, Func, Func>
