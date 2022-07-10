// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import curryN from './utils/curry_n.ts';
import type { InferType, PH } from './utils/types.ts';
import { isString } from './utils/is.ts';

// @types
type Slice_1<L extends ArrayLike<any> | string> = (
  fromIndex: number,
) => InferType<L>;

type Slice_2<L extends ArrayLike<any> | string> = (
  toIndex: number,
) => InferType<L>;

type Slice_3 = <L extends ArrayLike<any> | string>(list: L) => InferType<L>;

type Slice_2_3 =
  & ((toIndex: number) => Slice_3)
  & (<L extends ArrayLike<any> | string>(toIndex: PH, list: L) => Slice_2<L>)
  & (<L extends ArrayLike<any> | string>(
    toIndex: number,
    list: L,
  ) => InferType<L>);

type Slice_1_3 =
  & ((fromIndex: number) => Slice_3)
  & (<L extends ArrayLike<any> | string>(fromIndex: PH, list: L) => Slice_1<L>)
  & (<L extends ArrayLike<any> | string>(
    fromIndex: number,
    list: L,
  ) => InferType<L>);

type Slice_1_2<L extends ArrayLike<any> | string> =
  & ((fromIndex: number) => Slice_2<L>)
  & ((fromIndex: PH, toIndex: number) => Slice_1<L>)
  & ((fromIndex: number, toIndex: number) => InferType<L>);

type Slice =
  & ((fromIndex: number) => Slice_2_3)
  & ((fromIndex: PH, toIndex: number) => Slice_1_3)
  & (<L extends ArrayLike<any> | string>(
    fromIndex: PH,
    toIndex: PH,
    list: L,
  ) => Slice_1_2<L>)
  & ((fromIndex: number, toIndex: number) => Slice_3)
  & (<L extends ArrayLike<any> | string>(
    fromIndex: number,
    toIndex: PH,
    list: L,
  ) => Slice_2<L>)
  & (<L extends ArrayLike<any> | string>(
    fromIndex: PH,
    toIndex: number,
    list: L,
  ) => Slice_1<L>)
  & (<L extends ArrayLike<any> | string>(
    fromIndex: number,
    toIndex: number,
    list: L,
  ) => InferType<L>);

function _slice<L extends ArrayLike<any> | string>(
  fromIndex: number,
  toIndex: number,
  list: L,
) {
  if (isString(list)) return list.slice(fromIndex, toIndex);
  return Array.prototype.slice.call(list, fromIndex, toIndex);
}

/** Returns the elements of the given list or string `fromIndex` (inclusive) to `toIndex` (exclusive). */
export const slice = curryN(3, _slice) as Slice;
