import type { Obj, PH } from './utils/types.ts'
import curryN from './utils/curry_n.ts'

// @types
type ZipObj_2 = <T>(values: T[]) => Obj<T>

type ZipObj_1<T> = (keys: string[]) => Obj<T>

// prettier-ignore
type ZipObj =
  & ((keys: string[], values?: PH) => ZipObj_2)
  & (<T>(keys: PH, values: T[]) => ZipObj_1<T>)
  & (<T>(keys: string[], values: T[]) => Obj<T>)

function _zipObj<T>(keys: string[], values: T[]): Obj<T> {
  const result: Obj<T> = {}
  const len = Math.min(keys.length, values.length)
  for (let i = 0; i < len; i++) {
    result[keys[i]] = values[i]
  }

  return result
}

/**
 * Returns a new object out of given list of `keys` and `values`.
 * The returned is truncated to the length of the shorter of the two.
 *
 *
 *      Fae.zipObj(['a', 'b', 'c'], [1, 2, 3]) // {a: 1, b: 2, c: 3}
 */
export const zipObj: ZipObj = curryN(2, _zipObj)
