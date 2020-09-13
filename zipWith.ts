import type { PH } from "./utils/types.ts"
import curryN from "./utils/curry_n.ts"

// @types
type ZipWith_1<T1, T2> = (<R>(fn: (a: T1, b: T2) => R) => R[])
  & ((fn?: PH) => ZipWith_1<T1, T2>)

type ZipWith_2<T1, T2, R> = ((list1: T1[]) => R[])
  & ((list1?: PH) => ZipWith_2<T1, T2, R>)

type ZipWith_3<T1, T2, R> = ((list2: T2[]) => R[])
  & ((list2?: PH) => ZipWith_3<T1, T2, R>)

type ZipWith_2_3<T1, T2, R> = ((list1: T1[], list2: T2[]) => R[])
  & ((list1: T1[], list2?: PH) => ZipWith_3<T1, T2, R>)
  & (<L extends ArrayLike<T> | string, T = any>(list1: PH, list2: T2[]) => ZipWith_2<T1, T2, R>)
  & ((list1?: PH, list2?: PH) => ZipWith_2_3<T1, T2, R>)

type ZipWith_1_3<T1> = (<T2, R>(fn: (a: T1, b: T2) => R, list2: T2[]) => R[])
  & (<T2, R>(fn: (a: T1, b: T2) => R, list2?: PH) => ZipWith_3<T1, T2, R>)
  & (<T2>(fn: PH, list2: T2[]) => ZipWith_1<T1, T2>)
  & ((fn?: PH, list2?: PH) => ZipWith_1_3<T1>)

type ZipWith_1_2<T2> = (<T1, R>(fn: (a: T1, b: T2) => R, list1: T1[]) => R[])
  & (<T1, R>(fn: (a: T1, b: T2) => R, list1?: PH) => ZipWith_2<T1, T2, R>)
  & (<T1>(fn: PH, list1: T1[]) => ZipWith_1<T1, T2>)
  & ((fn?: PH, list1?: PH) => ZipWith_1_2<T2>)

type ZipWith = (<T1, T2, R>(fn: (a: T1, b: T2) => R, list1: T1[], list2: T2[]) => R[])
  & ((fn?: PH, list1?: PH, list2?: PH) => ZipWith)
  & (<T1, T2, R>(fn: (a: T1, b: T2) => R, list1?: PH, list2?: PH) => ZipWith_2_3<T1, T2, R>)
  & (<T1>(fn: PH, list1: T1[], list2?: PH) => ZipWith_1_3<T1>)
  & (<T2>(fn: PH, list1: PH, list2: T2[]) => ZipWith_1_2<T2>)
  & (<T1, T2, R>(fn: (a: T1, b: T2) => R, list1: T1[], list2?: PH) => ZipWith_3<T1, T2, R>)
  & (<T1, T2, R>(fn: (a: T1, b: T2) => R, list1: PH, list2: T2[]) => ZipWith_2<T1, T2, R>)
  & (<T1, T2>(fn: PH, list1: T1[], list2: T2[]) => ZipWith_1<T1, T2>)

function _zipWith<T1, T2, R>(
  fn: (a: T1, b: T2) => R,
  list1: T1[],
  list2: T2[]
) {
  const len = Math.min(list1.length, list2.length)
  const result = new Array<R>(len)
  for(let i = 0; i < len; i++) {
    result[i] = fn(list1[i], list2[i])
  }
  return result
}

/**
 * Creates a new list out of two passed lists `list1`, `list2`.
 * Each item of new list is calculated by applying equally-positioned pair
 * in both the lists.
 * The returned is truncated to the length of the shorter of the two input lists.
 * 
 * 
 *      Fae.zipWith(Fae.add, [100, 200, 300], [1, 2, 3]) // [101, 202, 303]
 */
export const zipWith: ZipWith = curryN(3, _zipWith)
