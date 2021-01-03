// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import type { Obj, PH } from './utils/types.ts'
import { prop } from './prop.ts'
import type { Prop } from './prop.ts'
import curryN from './utils/curry_n.ts'

// @types
type Props_2 = <T>(obj: Obj<T> | ArrayLike<T>) => (T | undefined)[]

type Props_1<T> = (p: Prop[]) => (T | undefined)[]

// prettier-ignore
type Props =
  & ((p: Prop[], obj?: PH) => Props_2)
  & (<T>(p: PH, obj: Obj<T> | ArrayLike<T>) => Props_1<T>)
  & (<T>(p: Prop[], obj: Obj<T> | ArrayLike<T>,) => (T | undefined)[])

function _props<T>(p: Prop[], obj: Obj<T> | ArrayLike<T>) {
  return p.map((a) => prop<T>(a, obj))
}

/** Returns an array of multiple on the `obj`. Order is preserved. */
export const props: Props = curryN(2, _props)
