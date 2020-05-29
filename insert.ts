import curryN from "./utils/curry_n.ts"
import { Curry3 } from "./utils/types.ts"

/**
 * Returns a new array with `element` inserted at `index` to `list`
 * without affecting original one.
*/
function insert(index: number, element: any, list: any[]) {
  index = index < list.length && index >= 0 ? index : list.length
  let result = Array.from(list)
  result.splice(index, 0, element)
  return result
}


export default curryN(3, insert) as Curry3<number, any, any[], any[]>
