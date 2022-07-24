// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import type { Func, PH } from './utils/types.ts';
import { dispatch } from './utils/dispatch.ts';
import curryN from './utils/curry_n.ts';
import TapTransformer from './utils/Transformers/tap.ts';

// @types
type Tap_2<T> = (obj: T) => T;

type Tap_1<T> = (func: Func<[T], void>) => T;

type Tap =
  & (<T>(func: Func<[T], void>) => Tap_2<T>)
  & (<T>(func: PH, obj: T) => Tap_1<T>)
  & (<T>(func: Func<[T], void>, obj: T) => T);

function _tap<T>(func: Func<[T], void>, obj: T) {
  func(obj);
  return obj;
}

const dispatchedTap = dispatch(TapTransformer, _tap);

/** Runs the given function `func` with the supplied object `obj`, then returns `obj`. */
export const tap = curryN(2, dispatchedTap) as Tap;
