// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import curryN from './utils/curry_n.ts';
import type { PH, Predicate1 } from './utils/types.ts';

// @types
type FindIndex_1<T> = (predicate: Predicate1<T>) => number;

type FindIndex_2<T> = (arr: T[]) => number;

type FindIndex =
  & (<T>(predicate: PH, arr: T[]) => FindIndex_1<T>)
  & (<T>(predicate: Predicate1<T>) => FindIndex_2<T>)
  & (<T>(predicate: Predicate1<T>, arr: T[]) => number);

// TODO: (singla-shivam) Add transformer
function _findIndex<T>(predicate: Predicate1<T>, arr: T[]) {
  for (let i = 0; i < arr.length; i++) {
    if (predicate(arr[i])) return i;
  }
  return -1;
}

/**
 * Takes in Array and Element as its 2 parameters
 * Return the 1st index If element is matched or -1 is unmatched.
 */
export const findIndex: FindIndex = curryN(2, _findIndex);
