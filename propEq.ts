// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import curryN from './utils/curry_n.ts';
import type { Obj, PH } from './utils/types.ts';
import type { Prop } from './prop.ts';
import { equals } from './equals.ts';

// @types
type PropEq_1 = (name: Prop) => boolean;

type PropEq_2<T> = (val: T) => boolean;

type PropEq_3<T1> = <T>(obj: Obj<T | T1>) => boolean;

type PropEq_2_3 =
  & (<T>(val: T) => PropEq_3<T>)
  & (<T>(val: PH, obj: Obj<T>) => PropEq_2<T>)
  & (<T>(val: T, obj: Obj<T>) => boolean);

type PropEq_1_3<T1> =
  & ((name: Prop) => PropEq_3<T1>)
  & (<T>(name: PH, obj: Obj<T | T1>) => PropEq_1)
  & (<T>(name: Prop, obj: Obj<T | T1>) => boolean);

type PropEq_1_2<T> =
  & ((name: Prop) => PropEq_2<T>)
  & ((name: PH, val: T) => PropEq_1)
  & ((name: Prop, val: T) => boolean);

type PropEq =
  & ((name: Prop) => PropEq_2_3)
  & (<T>(name: PH, val: T) => PropEq_1_3<T>)
  & (<T>(name: PH, val: PH, obj: Obj<T>) => PropEq_1_2<T>)
  & (<T>(name: Prop, val: T) => PropEq_3<T>)
  & (<T>(name: Prop, val: PH, obj: Obj<T>) => PropEq_2<T>)
  & (<T>(name: PH, val: T, obj: Obj<T>) => PropEq_1)
  & (<T>(name: Prop, val: T, obj: Obj<T>) => boolean);

function _propEq<T>(name: Prop, val: T, obj: Obj<T>) {
  return equals(val, obj[name]);
}

/**
 * Returns `true` if the specified object property is equal, to the given value; `false` otherwise.
 *
 *      const shivam = {name: 'shivam', age: 20, hair: 'brown'}
 *      const shubham = {name: 'shubham', age: 22, hair: 'black'}
 *      const Krish = {name: 'krish', age: 25, hair: 'black'}
 *      const students = [shivam, shubham, krish]
 *      const hasBrownHair = Fae.propEq('hair', 'brown')
 *      Fae.filter(hasBrownHair, students) //=> [shubham]
 */
export const propEq = curryN(3, _propEq) as PropEq;
