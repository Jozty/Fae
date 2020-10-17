import type { PH, Obj } from './utils/types.ts'
import {
  isUndefinedOrNull,
  isInteger,
  isArrayLike,
} from './utils/is.ts'
import { nth } from './nth.ts'
import curryN from './utils/curry_n.ts'

export type Prop = string | number

// @types
type Prop_2 = <T>(obj: Obj<T> | ArrayLike<T>) => T | undefined

type Prop_1<T> = (p: Prop) => T | undefined

// prettier-ignore
type PropF =
  & ((p: Prop, obj?: PH) => Prop_2)
  & (<T>(p: PH, obj: Obj<T> | ArrayLike<T>) => Prop_1<T>)
  & (<T>(p: Prop, obj: Obj<T> | ArrayLike<T>) => T | undefined)

function _prop<T>(
  p: Prop,
  obj: Obj<T> | ArrayLike<T>,
): T | undefined {
  if (isUndefinedOrNull(obj)) return
  // @ts-ignore
  return isInteger(p) && isArrayLike(obj) ? nth(p, obj) : obj[p]
}

/** Returns p property `p` on the `obj` if exists */
export const prop: PropF = curryN(2, _prop)
