// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import curryN from './utils/curry_n.ts'
import type { PH } from './utils/types.ts'
import { reduce } from './reduce.ts'
import { concat } from './concat.ts'
import { map } from './map.ts'

type Chain_2<T, R> = (g: T[]) => R[]

type Chain_1<T> = <R>(f: (a: T) => R[]) => R[]

// prettier-ignore
type Chain =
  & (<T, R>(f: (a: T) => R[]) => Chain_2<T, R>)
  & (<T>(f: PH, g: T[]) => Chain_1<T>)
  & (<T, R>(f: (a: T) => R[], g: T[]) => R[])

function _chain<T, R>(fun: (a: T) => R, list: ArrayLike<T>): R[] {
  // @ts-ignore
  return reduce(concat, [], map(fun, list))
}

export const chain: Chain = curryN(2, _chain)
