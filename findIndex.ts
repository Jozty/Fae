import curryN from './utils/curry_n.ts'
import type { PH } from './utils/types.ts'

// @types
type FindIndex_2<T> = (element: T) => number

type FindIndex_1<T> = (arr: T[]) => number

// prettier-ignore
type FindIndex =
  & (<T>(arr: T[], element?: PH) => FindIndex_2<T>)
  & (<T>(arr: PH, element: T) => FindIndex_1<T>)
  & (<T>(arr: T[], element: T) => number)

// TODO: (singla-shivam) Add transformer
// TODO: (ch-shubham) Add Support for Predicates
function _findIndex<T>(arr: Array<T>, element: T) {
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
