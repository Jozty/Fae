import curryN from "./utils/curry_n.ts"
import { PH } from "./utils/types.ts"

// @types
type Insert_1<T> = ((index: number) => T[])
  & ((index?: PH) => Insert_1<T>)

type Insert_2<T> = ((element: T) => T[])
  & ((element?: PH) => Insert_2<T>)

type Insert_3<T> = ((list: T[]) => T[])
  & ((list?: PH) => Insert_3<T>)

type Insert_2_3 = (<T>(element: T, list: T[]) => T[])
  & (<T>(element: T, list?: PH) => Insert_3<T>)
  & (<T>(element: PH, list: T[]) => Insert_2<T>)
  & ((element?: PH, list?: PH) => Insert_2_3)

type Insert_1_3<T> = ((index: number, list: T[]) => T[])
  & ((index: number, list?: PH) => Insert_3<T>)
  & (<T>(index: PH, list: T[]) => Insert_1<T>)
  & ((index?: PH, list?: PH) => Insert_1_3<T>)

type Insert_1_2<T> = ((index: number, element: T) => T[])
  & ((index: number, element?: PH) => Insert_2<T>)
  & ((index: PH, element: T) => Insert_1<T>)
  & ((index?: PH, element?: PH) => Insert_1_2<T>)

type Insert = (<T>(index: number, element: T, list: T[]) => T[])
  & ((index?: PH, element?: PH, list?: PH) => Insert)
  & ((index: number, element?: PH, list?: PH) => Insert_2_3)
  & (<T>(index: PH, element: T, list?: PH) => Insert_1_3<T>)
  & (<T>(index: PH, element: PH, list: T[]) => Insert_1_2<T>)
  & (<T>(index: number, element: T, list?: PH) => Insert_3<T>)
  & (<T>(index: number, element: PH, list: T[]) => Insert_2<T>)
  & (<T>(index: PH, element: T, list: T[]) => Insert_1<T>)

function _insert<T>(index: number, element: T, list: T[]) {
  index = index < list.length && index >= 0 ? index : list.length
  let result = Array.from(list)
  result.splice(index, 0, element)
  return result
}

/**
 * Returns a new array with `element` inserted at `index` to `list`
 * without affecting original one.
 */
export const insert: Insert = curryN(3, _insert)
