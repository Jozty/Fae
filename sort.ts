import curryN from './utils/curry_n.ts'
import { Curry2, Func } from "./utils/types.ts"

function sort(comparator: Func, list: any[]) {
  return [...list].sort(comparator)
}

export default <Curry2<Func, any[], any[]>>curryN(2, sort)