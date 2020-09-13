import type { Func, PH } from "./utils/types.ts"
import curryN from "./utils/curry_n.ts"

// @types
type Adjust_1<T> = ((index: number) => T[])
  & ((index?: PH) => Adjust_1<T>)

type Adjust_2<T> = ((fn: Func) => T[])
  & ((fn?: PH) => Adjust_2<T>)

type Adjust_3 = (<T>(list: T[]) => T[])
  & ((list?: PH) => Adjust_3)

type Adjust_2_3 = (<T>(fn: Func, list: T[]) => T[])
  & ((fn: Func, list?: PH) => Adjust_3)
  & (<T>(fn: PH, list: T[]) => Adjust_2<T>)
  & ((fn?: PH, list?: PH) => Adjust_2_3)

type Adjust_1_3 = (<T>(index: number, list: T[]) => T[])
  & ((index: number, list?: PH) => Adjust_3)
  & (<T>(index: PH, list: T[]) => Adjust_1<T>)
  & ((index?: PH, list?: PH) => Adjust_1_3)

type Adjust_1_2<T> = ((index: number, fn: Func) => T[])
  & ((index: number, fn?: PH) => Adjust_2<T>)
  & ((index: PH, fn: Func) => Adjust_1<T>)
  & ((index?: PH, fn?: PH) => Adjust_1_2<T>)

type Adjust = (<T>(index: number, fn: Func, list: T[]) => T[])
  & ((index?: PH, fn?: PH, list?: PH) => Adjust)
  & ((index: number, fn?: PH, list?: PH) => Adjust_2_3)
  & ((index: PH, fn: Func, list?: PH) => Adjust_1_3)
  & (<T>(index: PH, fn: PH, list: T[]) => Adjust_1_2<T>)
  & ((index: number, fn: Func, list?: PH) => Adjust_3)
  & (<T>(index: number, fn: PH, list: T[]) => Adjust_2<T>)
  & (<T>(index: PH, fn: Func, list: T[]) => Adjust_1<T>)


function _adjust<T>(index: number, fn: Func, list: T[][]) {
  const result = [...list]
  const len = result.length
  if(index >= len || index < -len) return result
  index = index < 0 ? len + index : index
  result[index] = fn(list[index])
  return result
}

/**
 * Applies a given function `fn` at given `index` of `list`,
 * returning a new copy of `list` with element at `index` replaced with 
 * return value of `fn`.
 * 
 *      Fae.adjust(2, Fae.add(1), [0, 1, 2, 3]) // [0, 1, 3, 3]
 *      Fae.adjust(-3, Fae.add(1), [0, 1, 2, 3]) // [0, 2, 2, 3]
 */
export const adjust: Adjust =  curryN(3, _adjust)
