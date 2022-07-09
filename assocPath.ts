// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import { getPath, Path } from './paths.ts';
import { tail } from './tail.ts';
import { assoc } from './assoc.ts';
import has from './utils/has.ts';
import { isArray, isInteger, isNotUndefinedOrNull } from './utils/is.ts';
import curryN from './utils/curry_n.ts';
import type { ObjRec, PH } from './utils/types.ts';

// @types
type AssocPath_1 = (path: Path) => ObjRec;

type AssocPath_2 = (val: unknown) => ObjRec;

type AssocPath_3 = (obj: ObjRec) => ObjRec;

type AssocPath_2_3 =
  & ((val: unknown) => AssocPath_3)
  & ((val: PH, obj: ObjRec) => AssocPath_2)
  & ((val: unknown, obj: ObjRec) => ObjRec);

type AssocPath_1_3 =
  & ((path: Path) => AssocPath_3)
  & ((path: PH, obj: ObjRec) => AssocPath_1)
  & ((path: Path, obj: ObjRec) => ObjRec);

type AssocPath_1_2 =
  & ((path: Path) => AssocPath_2)
  & ((path: PH, val: unknown) => AssocPath_1)
  & ((path: Path, val: unknown) => ObjRec);

type AssocPath =
  & ((path: Path) => AssocPath_2_3)
  & ((path: PH, val: unknown) => AssocPath_1_3)
  & ((path: PH, val: PH, obj: ObjRec) => AssocPath_1_2)
  & ((path: Path, val: unknown) => AssocPath_3)
  & ((path: Path, val: PH, obj: ObjRec) => AssocPath_2)
  & ((path: PH, val: unknown, obj: ObjRec) => AssocPath_1)
  & ((path: Path, val: unknown, obj: ObjRec) => ObjRec);

function _assocPath(path: Path, val: unknown, obj: ObjRec) {
  if (path.length === 0) return val;
  const p = getPath(path);

  const prop = p[0];

  if (p.length > 1) {
    const child = isNotUndefinedOrNull(obj) && has(obj, prop)
      ? obj[prop]
      : isInteger(prop)
      ? []
      : {};

    val = _assocPath(tail(p) as Path, val, child);
  }

  if (isInteger(prop) && isArray(obj)) {
    const result: unknown[] = [...obj];
    result[prop] = val;
    return result;
  }

  return assoc(prop, val, obj);
}

/**
 * Makes a shallow clone of an object, setting or overriding the nodes required
 * to create the given path, and placing the specific value at the tail end of
 * that path. Note that this copies and flattens prototype properties onto the
 * new object as well. All non-primitive properties are copied by reference.
 *
 *      Fae.assocPath(['a', 'b', 'c'], 42, {a: {b: {c: 0}}}); //=> {a: {b: {c: 42}}}
 *      Fae.assocPath(['a', 'b', 'c'], 42, {a: 5}); //=> {a: {b: {c: 42}}}
 */
export const assocPath: AssocPath = curryN(3, _assocPath);
