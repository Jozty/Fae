import curryN from './utils/curry_n.ts'
import type { PH, Obj } from './utils/types.ts'
import { pathOr } from './pathOr.ts'

// @types
type PropOr_1<T> = (<R>(d: R) => R) & ((d?: PH) => PropOr_1<T>)

type PropOr_2<T, R> = ((p: string | number) => R) &
  ((p?: PH) => PropOr_2<T, R>)

type PropOr_3<R> = (<T>(obj: Obj<T> | null) => R) &
  ((obj?: PH) => PropOr_3<R>)

type PropOr_2_3<R> = (<T>(
  p: string | number,
  obj: Obj<T> | null,
) => R) &
  ((p: string | number, obj?: PH) => PropOr_3<R>) &
  (<T>(p: PH, obj: Obj<T> | null) => PropOr_2<T, R>) &
  ((p?: PH, obj?: PH) => PropOr_2_3<R>)

type PropOr_1_3 = (<T, R>(d: R, obj: Obj<T> | null) => R) &
  (<R>(d: R, obj?: PH) => PropOr_3<R>) &
  (<T>(d: PH, obj: Obj<T> | null) => PropOr_1<T>) &
  ((d?: PH, obj?: PH) => PropOr_1_3)

type PropOr_1_2<T> = (<R>(d: R, p: string | number) => R) &
  (<R>(d: R, p?: PH) => PropOr_2<T, R>) &
  ((d: PH, p: string | number) => PropOr_1<T>) &
  ((d?: PH, p?: PH) => PropOr_1_2<T>)

type PropOr = (<T, R>(
  d: R,
  p: string | number,
  obj: Obj<T> | null,
) => R) &
  ((d?: PH, p?: PH, obj?: PH) => PropOr) &
  (<R>(d: R, p?: PH, obj?: PH) => PropOr_2_3<R>) &
  ((d: PH, p: string | number, obj?: PH) => PropOr_1_3) &
  (<T>(d: PH, p: PH, obj: Obj<T> | null) => PropOr_1_2<T>) &
  (<R>(d: R, p: string | number, obj?: PH) => PropOr_3<R>) &
  (<T, R>(d: R, p: PH, obj: Obj<T> | null) => PropOr_2<T, R>) &
  (<T>(d: PH, p: string | number, obj: Obj<T> | null) => PropOr_1<T>)

function _propOr<T, R>(d: R, p: string | number, obj: Obj<T> | null) {
  return pathOr<T, R, T>(d, [p], obj)
}

/**
 * If the given, non-null object has an own property with the specified name,
 * returns the value of that property. Otherwise returns the provided default
 * value.
 *      const alice = {
 *        name: 'Fae',
 *        age: 15
 *      };
 *      const Great = Fae.prop('GreatLibrary');
 *      const GreatWithDefault = Fae.propOr('FaeModule', 'GreatLibrary');
 *
 *      Great(Fae);  //=> undefined
 *      GreatWithDefault(Fae);  //=> 'FaeModule'
 */
export const propOr: PropOr = curryN(3, _propOr)
