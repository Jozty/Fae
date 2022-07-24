// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import type { Obj, PH, Predicate1 } from './utils/types.ts';
import type { Prop } from './prop.ts';
import curryN from './utils/curry_n.ts';

// @types
type PropSatisfies_1<T> = (pred: Predicate1<T>) => boolean;

type PropSatisfies_2<T> = (name: Prop) => boolean;

type PropSatisfies_3<T> = (obj: Obj<T>) => boolean;

type PropSatisfies_2_3<T> =
  & ((name: Prop) => PropSatisfies_3<T>)
  & ((name: PH, obj: Obj<T>) => PropSatisfies_2<T>)
  & ((name: Prop, obj: Obj<T>) => boolean);

type PropSatisfies_1_3 =
  & (<T>(pred: Predicate1<T>) => PropSatisfies_3<T>)
  & (<T>(pred: PH, obj: Obj<T>) => PropSatisfies_1<T>)
  & (<T>(pred: Predicate1<T>, obj: Obj<T>) => boolean);

type PropSatisfies_1_2<T> =
  & ((pred: Predicate1<T>) => PropSatisfies_2<T>)
  & ((pred: PH, name: Prop) => PropSatisfies_1<T>)
  & ((pred: Predicate1<T>, name: Prop) => boolean);

type PropSatisfies =
  & (<T>(pred: Predicate1<T>) => PropSatisfies_2_3<T>)
  & ((pred: PH, name: Prop) => PropSatisfies_1_3)
  & (<T>(pred: PH, name: PH, obj: Obj<T>) => PropSatisfies_1_2<T>)
  & (<T>(pred: Predicate1<T>, name: Prop) => PropSatisfies_3<T>)
  & (<T>(pred: Predicate1<T>, name: PH, obj: Obj<T>) => PropSatisfies_2<T>)
  & (<T>(pred: PH, name: Prop, obj: Obj<T>) => PropSatisfies_1<T>)
  & (<T>(pred: Predicate1<T>, name: Prop, obj: Obj<T>) => boolean);

function _propSatisfies<T>(
  pred: Predicate1<T>,
  name: Prop,
  obj: Obj<T>,
) {
  return pred(obj[name]);
}

/**
 * Returns `true` if the specified object property satisfies the given
 * predicate; `false` otherwise.
 *
 *      Fae.propSatisfies(x => x > 0, 'x', {x: 1, y: 2}); //=> true
 */
export const propSatisfies = curryN(3, _propSatisfies) as PropSatisfies;
