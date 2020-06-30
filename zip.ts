import { zipWith } from "./zipWith.ts"
import curryN from "./utils/curry_n.ts"
import { PH } from "./utils/types.ts"

// @types
type Zip_2<T1> = (<T2>(list2: T2[]) => [T1, T2][])
  & ((list2?: PH) => Zip_2<T1>)

type Zip_1<T2> = (<T1>(list1: T1[]) => [T1, T2][])
  & ((list1?: PH) => Zip_1<T2>)

type Zip = (<T1, T2>(list1: T1[], list2: T2[]) => [T1, T2][])
  & (<T1>(list1: T1[], list2?: PH) => Zip_2<T1>)
  & (<T2>(list1: PH, list2: T2[]) => Zip_1<T2>)
  & ((list1?: PH, list2?: PH) => Zip)

function _zip<T1, T2>(list1: T1[], list2: T2[]): [T1, T2][] {
  return zipWith((a, b) => [a, b], list1, list2)
}

/**
 * Creates a new list out of two passed lists `list1`, `list2` by pairing up
 * equally-positioned pair in both the lists.
 * The returned is truncated to the length of the shorter of the two input lists.
 * 
 * 
 *      Fae.zip([100, 200, 300], [1, 2, 3]) // [[1, 100], [2, 200], [3, 300]]
 */
export const zip: Zip = curryN(2, _zip)
