// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import curryN from './utils/curry_n.ts';
import type { PH } from './utils/types.ts';
import { range } from './range.ts';

// @types
type RangeUntil_2 = (to: number) => number[];

type RangeUntil_1 = (from: number) => number[];

type RangeUntil =
  & ((from: number) => RangeUntil_2)
  & ((from: PH, to: number) => RangeUntil_1)
  & ((from: number, to: number) => number[]);

function _rangeUntil(from: number, to: number) {
  const r = range(from, to);
  r.pop();
  return r;
}

/** Returns a list of numbers from `from` (**inclusive**) to `to` (**exclusive**). */
export const rangeUntil = curryN(2, _rangeUntil) as RangeUntil;
