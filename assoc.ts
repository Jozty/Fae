import type { ObjRec, PH } from "./utils/types.ts"
import curryN from "./utils/curry_n.ts"

// @types
type Assoc_1 = ((prop: string | number) => ObjRec)
  & ((prop?: PH) => Assoc_1)

type Assoc_2 = ((val: any) => ObjRec)
  & ((val?: PH) => Assoc_2)

type Assoc_3 = ((obj: ObjRec) => ObjRec)
  & ((obj?: PH) => Assoc_3)

type Assoc_2_3 = ((val: any, obj: ObjRec) => ObjRec)
  & ((val: any, obj?: PH) => Assoc_3)
  & ((val: PH, obj: ObjRec) => Assoc_2)
  & ((val?: PH, obj?: PH) => Assoc_2_3)

type Assoc_1_3 = ((prop: string | number, obj: ObjRec) => ObjRec)
  & ((prop: string | number, obj?: PH) => Assoc_3)
  & ((prop: PH, obj: ObjRec) => Assoc_1)
  & ((prop?: PH, obj?: PH) => Assoc_1_3)

type Assoc_1_2 = ((prop: string | number, val: any) => ObjRec)
  & ((prop: string | number, val?: PH) => Assoc_2)
  & ((prop: PH, val: any) => Assoc_1)
  & ((prop?: PH, val?: PH) => Assoc_1_2)

type Assoc = ((prop: string | number, val: any, obj: ObjRec) => ObjRec)
  & ((prop?: PH, val?: PH, obj?: PH) => Assoc)
  & ((prop: string | number, val?: PH, obj?: PH) => Assoc_2_3)
  & ((prop: PH, val: any, obj?: PH) => Assoc_1_3)
  & ((prop: PH, val: PH, obj: ObjRec) => Assoc_1_2)
  & ((prop: string | number, val: any, obj?: PH) => Assoc_3)
  & ((prop: string | number, val: PH, obj: ObjRec) => Assoc_2)
  & ((prop: PH, val: any, obj: ObjRec) => Assoc_1)


function _assoc(prop: string | number, val: any, obj: ObjRec) {
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
