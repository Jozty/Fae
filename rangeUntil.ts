import curryN from "./utils/curry_n.ts"
import { PH } from "./utils/types.ts"
import { range } from "./range.ts"

// @types
type RangeUntil_2 = ((to: number) => number[])
  & ((to?: PH) => RangeUntil_2)

type RangeUntil_1 = ((from: number) => number[])
  & ((from?: PH) => RangeUntil_1)

type RangeUntil = ((from: number, to: number) => number[])
  & ((from: number, to?: PH) => RangeUntil_2)
  & ((from: PH, to: number) => RangeUntil_1)
  & ((from?: PH, to?: PH) => RangeUntil)

function _rangeUntil(from: number, to: number) {
  const r = range(from, to)
  r.pop()
  return r
}

/** Returns a list of numbers from `from` (**inclusive**) to `to` (**exclusive**). */
export const rangeUntil: RangeUntil = curryN(2, _rangeUntil)
