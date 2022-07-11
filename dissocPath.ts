// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import { getPath, Path } from './paths.ts';
import { isArray, isInteger, isUndefinedOrNull } from './utils/is.ts';
import { dissoc } from './dissoc.ts';
import { tail } from './tail.ts';
import { update } from './update.ts';
import { assoc } from './assoc.ts';
import curryN from './utils/curry_n.ts';
import type { ObjRec, PH } from './utils/types.ts';

// @types
type DissocPath_2 = (obj: ObjRec) => ObjRec;

type DissocPath_1 = (path: Path) => ObjRec;

type DissocPath =
  & ((path: Path) => DissocPath_2)
  & ((path: PH, obj: ObjRec) => DissocPath_1)
  & ((path: Path, obj: ObjRec) => ObjRec);

// TODO: move to mod
function _remove<T>(index: number, arr: T[]) {
  const result = [...arr];
  result.splice(index, 1);
  return result;
}

function _dissocPath<T extends ObjRec | unknown[]>(path: Path, obj: T): T {
  // create shallow clone of obj
  let result: T;

  if (isArray(obj)) result = [...obj] as T;
  else result = { ...obj };

  const p = getPath(path);
  const prop = p[0];

  if (p.length === 0) return result;
  if (p.length === 1) {
    if (isInteger(prop) && isArray(result)) return _remove(prop, result) as T;
    return dissoc(prop, result as ObjRec) as T;
  }

  if (isUndefinedOrNull(result[prop as number])) return obj;
  const tl = tail(p) as typeof p;

  if (isInteger(prop) && isArray(obj)) {
    const dissocedChild = _dissocPath(tl, obj[prop] as ObjRec);

    return update(prop, dissocedChild, obj) as T;
  } else {
    return assoc(
      prop,
      // @ts-ignore: TODO
      _dissocPath(tl, obj[prop]),
      obj as ObjRec,
    ) as T;
  }
}

/**
 * Makes a shallow clone of an object `obj`, deleting value at
 * at the given `path`. Note that this copies and flattens prototype properties onto the
 * new object as well. All non-primitive properties are copied by reference.
 *
 *      Fae.dissocPath(['a', 'b', 'c'], {a: {b: {c: 42}}}); //=> {a: {b: {}}}
 */
export const dissocPath = curryN(2, _dissocPath) as DissocPath;
