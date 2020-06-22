import curryN from "./utils/curry_n.ts"
import { Curry } from "./utils/types.ts"

function _range(from: number, to: number) {
  const result = []
  const l = to - from + 1
  if(l <= 0) return []
  result.length = l
  for(let i = 0; i < l; i++) {
    result[i] = from++
  }
  return result
}

/** Returns a list of numbers from `from` to `to` **both inclusive**. */
export const range: Curry<typeof _range> = curryN(2, _range)
