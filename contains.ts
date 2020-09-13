import curryN from "./utils/curry_n.ts"
import type { PH } from "./utils/types.ts"

// TODO: write transformer

// @types
type Contains_2<T> = ((list: ArrayLike<T>) => boolean)
  & ((list?: PH) => Contains_2<T>)

type Contains_1<T> = ((element: T) => boolean)
  & ((element?: PH) => Contains_1<T>)

type Contains = (<T>(element: T, list: ArrayLike<T>) => boolean)
  & (<T>(element: T, list?: PH) => Contains_2<T>)
  & (<T>(element: PH, list: ArrayLike<T>) => Contains_1<T>)
  & ((element?: PH, list?: PH) => Contains)

function _contains<T>(element: T, list: ArrayLike<T>) {
  let index = 0
  while (index != list.length) {
    if (list[index] === element) return true
    index++
  }
  return false
}

/**
 * Returns `true` or `false` based on the element found or not. 
 */
export const contains: Contains = curryN(2, _contains)
