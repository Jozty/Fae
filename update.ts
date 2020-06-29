import { adjust } from "./adjust.ts"
import { always } from "./always.ts"
import curryN from "./utils/curry_n.ts"
import { PH } from "./utils/types.ts"

// @types
type Update_1<T> = ((index: number) => T[])
  & ((index?: PH) => Update_1<T>)

type Update_2<T> = ((value: T) => T[])
  & ((value?: PH) => Update_2<T>)

type Update_3<T> = ((list: T[]) => T[])
  & ((list?: PH) => Update_3<T>)

type Update_2_3 = (<T>(value: T, list: T[]) => T[])
  & (<T>(value: T, list?: PH) => Update_3<T>)
  & (<T>(value: PH, list: T[]) => Update_2<T>)
  & ((value?: PH, list?: PH) => Update_2_3)

type Update_1_3<T> = ((index: number, list: T[]) => T[])
  & ((index: number, list?: PH) => Update_3<T>)
  & ((index: PH, list: T[]) => Update_1<T>)
  & ((index?: PH, list?: PH) => Update_1_3<T>)

type Update_1_2<T> = ((index: number, value: T) => T[])
  & ((index: number, value?: PH) => Update_2<T>)
  & ((index: PH, value: T) => Update_1<T>)
  & ((index?: PH, value?: PH) => Update_1_2<T>)

type Update = (<T>(index: number, value: T, list: T[]) => T[])
  & ((index?: PH, value?: PH, list?: PH) => Update)
  & ((index: number, value?: PH, list?: PH) => Update_2_3)
  & (<T>(index: PH, value: T, list?: PH) => Update_1_3<T>)
  & (<T>(index: PH, value: PH, list: T[]) => Update_1_2<T>)
  & (<T>(index: number, value: T, list?: PH) => Update_3<T>)
  & (<T>(index: number, value: PH, list: T[]) => Update_2<T>)
  & (<T>(index: PH, value: T, list: T[]) => Update_1<T>)

function _update<T>(index: number, value: T, list: T[]) {
  return adjust(index, always(value), list)
}


/**
 * Returns a new array with copy of `list` and `value` replaced at `index`.
 * 
 * 
 *      Fae.adjust(2, Fae.add(1), [0, 1, 2, 3]) // [0, 1, 3, 3]
 *      Fae.adjust(-3, Fae.add(1), [0, 1, 2, 3]) // [0, 2, 2, 3]
 */
export const update: Update = curryN(3, _update)
