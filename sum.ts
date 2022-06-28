// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

/** Adds together all the elements of a list. */
export function sum(list: number[]): number {
  return list.reduce((a, b) => a + b, 0)
}
