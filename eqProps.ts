// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import type { Obj, PH } from './utils/types.ts';
import curryN from './utils/curry_n.ts';
import { equals } from './equals.ts';
import type { Prop } from './prop.ts';

// @types
type EqProps_1<T> = (prop: Prop) => boolean;

type EqProps_3<T> = (obj2: Obj<T>) => boolean;

type EqProps_2_3 =
  & (<T>(obj1: Obj<T>) => EqProps_3<T>)
  & (<T>(obj1: Obj<T>, obj2: Obj<T>) => boolean);

type EqProps_1_3<T> =
  & ((prop: Prop) => EqProps_3<T>)
  & ((prop: PH, obj2: Obj<T>) => EqProps_1<T>)
  & ((prop: Prop, obj2: Obj<T>) => boolean);

type EqProps =
  & ((prop: Prop) => EqProps_2_3)
  & (<T>(prop: PH, obj1: Obj<T>) => EqProps_1_3<T>)
  & (<T>(prop: Prop, obj1: Obj<T>) => EqProps_3<T>)
  & (<T>(prop: PH, obj1: Obj<T>, obj2: Obj<T>) => EqProps_1<T>)
  & (<T>(prop: Prop, obj1: Obj<T>, obj2: Obj<T>) => boolean);

function _eqProps<T>(prop: Prop, obj1: Obj<T>, obj2: Obj<T>) {
  return equals(obj1[prop], obj2[prop]);
}

/**
 * Reports whether two objects have the same value, for the specified property.
 * Useful as a curried predicate.
 *
 *      const obj1 = { a: 1, b: 2, c: 3, d: 4 }
 *      const obj2 = { a: 10, b: 20, c: 3, d: 40 }
 *      Fae.eqProps('a', obj1, obj2) //=> false
 *      Fae.eqProps('c', obj1, obj2) //=> true
 */
export const eqProps = curryN(3, _eqProps) as EqProps;
