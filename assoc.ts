// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import type { ObjRec, PH } from './utils/types.ts'
import curryN from './utils/curry_n.ts'

// @types
type Assoc_1 = (prop: string | number) => ObjRec

type Assoc_2 = (val: unknown) => ObjRec

type Assoc_3 = (obj: ObjRec) => ObjRec

// prettier-ignore
type Assoc_2_3 =
  & ((val: PH, obj: ObjRec) => Assoc_2)
  & ((val: unknown) => Assoc_3)
  & ((val: unknown, obj: ObjRec) => ObjRec)

// prettier-ignore
type Assoc_1_3 =
  & ((prop: PH, obj: ObjRec) => Assoc_1)
  & ((prop: string | number) => Assoc_3)
  & ((prop: string | number, obj: ObjRec) => ObjRec)

// prettier-ignore
type Assoc_1_2 =
  & ((prop: PH, val: unknown) => Assoc_1)
  & ((prop: string | number) => Assoc_2)
  & ((prop: string | number, val: unknown) => ObjRec)

// prettier-ignore
type Assoc =
  & ((prop: string | number) => Assoc_2_3)
  & ((prop: PH, val: unknown) => Assoc_1_3)
  & ((prop: PH, val: PH, obj: ObjRec) => Assoc_1_2)
  & ((prop: string | number, val: unknown) => Assoc_3)
  & ((prop: string | number, val: PH, obj: ObjRec) => Assoc_2)
  & ((prop: PH, val: unknown, obj: ObjRec) => Assoc_1)
  & ((prop: string | number, val: unknown, obj: ObjRec) => ObjRec)

function _assoc(prop: string | number, val: unknown, obj: ObjRec) {
  const result: ObjRec = {}

  for (let p in obj) result[p] = obj[p]

  result[prop] = val
  return result
}

/**
 * Makes a shallow clone of `obj`, setting or overriding the specified
 * property `prop` with the given `val`. All non-primitive properties are
 * copied by reference.
 *
 *      Fae.assoc('c', 3, {a: 1, b: 2}); //=> {a: 1, b: 2, c: 3}
 */
export const assoc: Assoc = curryN(3, _assoc)
