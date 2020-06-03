import curryN from "./utils/curry_n.ts"
import { Curry2 } from "./utils/types.ts"
import { range } from "./range.ts"

function _rangeUntil(from: number, to: number) {
  const r = range(from, to)
  r.pop()
  return r
}

/** Returns a list of numbers from `from` (**inclusive**) to `to` (**exclusive**). */
export const rangeUntil: Curry2<number, number, number[]> = curryN(2, _rangeUntil)
