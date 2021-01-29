// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import { Path, getPath } from './paths.ts'
import { isInteger, isArray, isUndefinedOrNull } from './utils/is.ts'
import { dissoc } from './dissoc.ts'
import { tail } from './tail.ts'
import { update } from './update.ts'
import { assoc } from './assoc.ts'
import curryN from './utils/curry_n.ts'
import type { PH, ObjRec } from './utils/types.ts'

// @types
type DissocPath_2 = (obj: ObjRec) => ObjRec

type DissocPath_1 = (path: Path) => ObjRec

// prettier-ignore
type DissocPath =
  & ((path: Path, obj?: PH) => DissocPath_2)
  & ((path: PH, obj: ObjRec) => DissocPath_1)
  & ((path: Path, obj: ObjRec) => ObjRec)

// TODO: move to mod
function _remove(index: number, arr: any[]) {
  const result = [...arr]
  result.splice(index, 1)
  return result
}

function _dissocPath(path: Path, obj: ObjRec): ObjRec {
  const p = getPath(path)
  const prop = p[0]
  if (p.length === 0) return obj
  if (p.length === 1) {
    if (isInteger(prop) && isArray(obj)) return _remove(prop, obj)
    return dissoc(prop, obj)
  }

  const tl = tail(p) as typeof p
  if (isUndefinedOrNull(obj[prop])) return obj
  if (isInteger(prop) && isArray(obj)) {
    return update(prop, _dissocPath(tl, obj[prop]), obj)
  } else {
    return assoc(prop, _dissocPath(tl, obj[prop]), obj)
  }
}

/**
 * Makes a shallow clone of an object `obj`, deleting value at
 * at the given `path`. Note that this copies and flattens prototype properties onto the
 * new object as well. All non-primitive properties are copied by reference.
 *
 *      Fae.dissocPath(['a', 'b', 'c'], {a: {b: {c: 42}}}); //=> {a: {b: {}}}
 *
 */
export const dissocPath: DissocPath = curryN(2, _dissocPath)
