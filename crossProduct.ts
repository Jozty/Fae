import curryN from './utils/curry_n.ts'
import type { PH } from './utils/types.ts'

// @types
type CrossProduct_2<T1> = <T2>(b: T2[]) => [T1, T2][]

type CrossProduct_1<T2> = <T1>(a: T1[]) => [T1, T2][]

// prettier-ignore
type CrossProduct =
  & (<T1>(a: T1[], b?: PH) => CrossProduct_2<T1>)
  & (<T2>(a: PH, b: T2[]) => CrossProduct_1<T2>)
  & (<T1, T2>(a: T1[], b: T2[]) => [T1, T2][])

function _crossProduct<T1, T2>(a: T1[], b: T2[]): [T1, T2][] {
  let result: [T1, T2][] = []
  for (let idx = 0; idx < a.length; idx++)
    for (let j = 0; j < b.length; j++)
      result[result.length] = [a[idx], b[j]]
  return result
}

/**
 * Creates a new list out of the two supplied by creating each possible pair
 * from the list passed as arguments.
 *
 *     Fae.crossProduct([1, 2, 3], ['a', 'b']); //=> [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b'], [3, 'a'], [3, 'b']]
 */
export const crossProduct: CrossProduct = curryN(2, _crossProduct)
