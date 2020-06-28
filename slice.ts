import curryN from './utils/curry_n.ts'
import { PH } from './utils/types.ts'
import { isString } from './utils/is.ts'

// @types
type Slice_1<L extends ArrayLike<T> | string, T = any> = ((fromIndex: number) => L)
  & ((fromIndex?: PH) => Slice_1<L, T>)

type Slice_2<L extends ArrayLike<T> | string, T = any> = ((toIndex: number) => L)
  & ((toIndex?: PH) => Slice_2<L, T>)

type Slice_3 = (<L extends ArrayLike<T> | string, T = any>(list: L) => L)
  & ((list?: PH) => Slice_3)

type Slice_2_3 = (<L extends ArrayLike<T> | string, T = any>(toIndex: number, list: L) => L)
  & ((toIndex: number, list?: PH) => Slice_3)
  & (<L extends ArrayLike<T> | string, T = any>(toIndex: PH, list: L) => Slice_2<L, T>)
  & ((toIndex?: PH, list?: PH) => Slice_2_3)

type Slice_1_3 = (<L extends ArrayLike<T> | string, T = any>(fromIndex: number, list: L) => L)
  & ((fromIndex: number, list?: PH) => Slice_3)
  & (<L extends ArrayLike<T> | string, T = any>(fromIndex: PH, list: L) => Slice_1<L, T>)
  & ((fromIndex?: PH, list?: PH) => Slice_1_3)

type Slice_1_2<L extends ArrayLike<T> | string, T = any> = ((fromIndex: number, toIndex: number) => L)
  & ((fromIndex: number, toIndex?: PH) => Slice_2<L, T>)
  & ((fromIndex: PH, toIndex: number) => Slice_1<L, T>)
  & ((fromIndex?: PH, toIndex?: PH) => Slice_1_2<L, T>)

type Slice = (<L extends ArrayLike<T> | string, T = any>(fromIndex: number, toIndex: number, list: L) => L)
  & ((fromIndex?: PH, toIndex?: PH, list?: PH) => Slice)
  & ((fromIndex: number, toIndex?: PH, list?: PH) => Slice_2_3)
  & ((fromIndex: PH, toIndex: number, list?: PH) => Slice_1_3)
  & (<L extends ArrayLike<T> | string, T = any>(fromIndex: PH, toIndex: PH, list: L) => Slice_1_2<L, T>)
  & ((fromIndex: number, toIndex: number, list?: PH) => Slice_3)
  & (<L extends ArrayLike<T> | string, T = any>(fromIndex: number, toIndex: PH, list: L) => Slice_2<L, T>)
  & (<L extends ArrayLike<T> | string, T = any>(fromIndex: PH, toIndex: number, list: L) => Slice_1<L, T>)

function _slice<L extends ArrayLike<T> | string, T = any>(fromIndex: number, toIndex: number, list: L) {
  if(isString(list)) return list.slice(fromIndex, toIndex)
  return Array.prototype.slice.call(list, fromIndex, toIndex)
}

/** Returns the elements of the given list or string `fromIndex` (inclusive) to `toIndex` (exclusive). */
export const slice: Slice = curryN(3, _slice)
