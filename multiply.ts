// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import curryN from './utils/curry_n.ts';

// @types
type Multiply_2 = (b: number) => number;

type Multiply =
  & ((a: number) => Multiply_2)
  & ((a: number, b: number) => number);

function _multiply(a: number, b: number) {
  return a * b;
}

/**
 * Multiplies two numbers. Equivalent to `a * b` but curried.
 */
export const multiply: Multiply = curryN(2, _multiply);
