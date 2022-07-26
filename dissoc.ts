// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import type { ObjRec, PH } from './utils/types.ts';
import curryN from './utils/curry_n.ts';

// @types
type Dissoc_2<P extends string | number> = <T>(obj: T) => Omit<T, P>;

type Dissoc_1<T> = <P extends keyof T>(prop: P) => Omit<T, P>;

type Dissoc =
  & (<P extends string | number>(prop: P) => Dissoc_2<P>)
  & (<T>(prop: PH, obj: T) => Dissoc_1<T>)
  & (<T, P extends keyof T>(prop: P, obj: T) => Omit<T, P>);

function _dissoc(prop: string | number, obj: ObjRec) {
  const result: ObjRec = {};

  for (const p in obj) result[p] = obj[p];

  delete result[prop];
  return result;
}

/**
 * Makes a shallow clone of `obj`, deleting `props` from the new object.
 * All non-primitive properties are copied by reference.
 *
 *      Fae.dissoc('b', {a: 1, b: 2, c: 3}); //=> {a: 1, c: 3}
 */
export const dissoc = curryN(2, _dissoc) as Dissoc;
