import type { PH, Obj } from './utils/types.ts'
import {
  isUndefinedOrNull,
  isInteger,
  isArrayLike,
} from './utils/is.ts'
import { nth } from './nth.ts'
import curryN from './utils/curry_n.ts'

// @types
type Prop_2 = (<T>(obj: Obj<T> | ArrayLike<T>) => T | undefined) &
  ((obj?: PH) => Prop_2)

type Prop_1<T> = ((p: string | number) => T | undefined) &
  ((p?: PH) => Prop_1<T>)

type Prop = (<T>(
  p: string | number,
  obj: Obj<T> | ArrayLike<T>,
) => T | undefined) &
  ((p: string | number, obj?: PH) => Prop_2) &
  (<T>(p: PH, obj: Obj<T> | ArrayLike<T>) => Prop_1<T>) &
  ((p?: PH, obj?: PH) => Prop)

function _prop<T>(
  p: string | number,
  obj: Obj<T> | ArrayLike<T>,
): T | undefined {
  if (isUndefinedOrNull(obj)) return
  // @ts-ignore
  return isInteger(p) && isArrayLike(obj) ? nth(p, obj) : obj[p]
}

/** Returns p property `p` on the `obj` if exists */
export const prop: Prop = curryN(2, _prop)
