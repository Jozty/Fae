import curryN from './utils/curry_n.ts'
import type { PH } from './utils/types.ts'

// @types
type FindIndex_2<T> = ((element: T) => number) &
  ((element?: PH) => FindIndex_2<T>)

type FindIndex_1<T> = ((arr: T[]) => number) &
  ((arr?: PH) => FindIndex_1<T>)

type FindIndex = (<T>(arr: T[], element: T) => number) &
  (<T>(arr: T[], element?: PH) => FindIndex_2<T>) &
  (<T>(arr: PH, element: T) => FindIndex_1<T>) &
  ((arr?: PH, element?: PH) => FindIndex)

// TODO: (singla-shivam) Add transformer
// TODO: (ch-shubham) Add Support for Predicates

function _findIndex(arr: Array<any>, element: any) {
  for (let i = 0; i <= arr.length; i++) {
    if (element === arr[i]) return i
  }
  return -1
}

/**
 * Takes in Array and Element as its 2 parameters
 * Return the 1st index If element is matched or -1 is unmatched.
 */
export const findIndex: FindIndex = curryN(2, _findIndex)
