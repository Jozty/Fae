// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import curryN from './utils/curry_n.ts';
import { add } from './add.ts';
import { sort } from './sort.ts';
import { filter } from './filter.ts';
import { comparator } from './comparator.ts';

// @types
type Median = (list: number[]) => number;

function _median(list: number[]) {
  list = filter((x: number) => !isNaN(x), list) as number[];
  const len = list.length;

  if (len === 0) return NaN;

  const listSorted: number[] = sort(
    comparator<number>((a, b) => a < b),
    list,
  );

  if (len % 2 === 1) return listSorted[Math.trunc(len / 2)];

  return add(listSorted[len / 2], listSorted[len / 2 - 1]) / 2;
}

/**
 * Returns the median of the given list of numbers. NaNs are filtered out, if present.
 * Returns NaN if the list is empty.
 */
export const median: Median = curryN(1, _median);
