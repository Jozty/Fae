// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import curryN from './utils/curry_n.ts';
import type { Obj, PH } from './utils/types.ts';
import type { Prop } from './prop.ts';
import { pathOr } from './pathOr.ts';

// @types
type PropOr_1<T> = <R>(d: R) => R;

type PropOr_2<T, R> = (p: Prop) => R;

type PropOr_3<R> = <T>(obj: Obj<T> | null) => R;

type PropOr_2_3<R> =
  & ((p: Prop) => PropOr_3<R>)
  & (<T>(p: PH, obj: Obj<T> | null) => PropOr_2<T, R>)
  & (<T>(p: Prop, obj: Obj<T> | null) => R);

type PropOr_1_3 =
  & (<R>(d: R) => PropOr_3<R>)
  & (<T>(d: PH, obj: Obj<T> | null) => PropOr_1<T>)
  & (<T, R>(d: R, obj: Obj<T> | null) => R);

type PropOr_1_2<T> =
  & (<R>(d: R) => PropOr_2<T, R>)
  & ((d: PH, p: Prop) => PropOr_1<T>)
  & (<R>(d: R, p: Prop) => R);

type PropOr =
  & (<R>(d: R) => PropOr_2_3<R>)
  & ((d: PH, p: Prop) => PropOr_1_3)
  & (<T>(d: PH, p: PH, obj: Obj<T> | null) => PropOr_1_2<T>)
  & (<R>(d: R, p: Prop) => PropOr_3<R>)
  & (<T, R>(d: R, p: PH, obj: Obj<T> | null) => PropOr_2<T, R>)
  & (<T>(d: PH, p: Prop, obj: Obj<T> | null) => PropOr_1<T>)
  & (<T, R extends T>(d: R, p: Prop, obj: Obj<T> | null) => R);

function _propOr<T, R>(d: R, p: Prop, obj: Obj<T> | null) {
  return pathOr<T, R, T>(d, [p], obj);
}

/**
 * If the given, non-null object has an own property with the specified name,
 * returns the value of that property. Otherwise returns the provided default
 * value.
 *      const fae = {
 *        name: 'Fae',
 *        age: 15
 *      }
 *      const Great = Fae.prop('GreatLibrary')
 *      const GreatWithDefault = Fae.propOr('FaeModule', 'GreatLibrary')
 *
 *      Great(fae)  //=> undefined
 *      GreatWithDefault(fae) //=> 'FaeModule'
 */
export const propOr = curryN(3, _propOr) as PropOr;
