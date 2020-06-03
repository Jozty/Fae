import curryN from "./utils/curry_n.ts"
import { Curry2 } from "./utils/types.ts"


function xprod(a: Array<any>, b: Array<any>) { 
  let idx = 0
  let ilen = a.length
  let jlen = b.length
  let result = []
  let j
  while (idx < ilen) {
    j = 0
    while (j < jlen) {
      result[result.length] = [a[idx], b[j]]
      j += 1
    }
    idx += 1
  }
  return result
}
export default curryN(2, xprod) as Curry2<Array<any>>
