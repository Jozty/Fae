// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import curryN from './utils/curry_n.ts';
import { lift } from './lift.ts';
import { not } from './not.ts';

// @types
type Complement = <T extends unknown[]>(
  a: (...args: T) => boolean,
) => (...args: T) => boolean;

const _complement = lift(not);

function _complement1<T extends unknown[]>(
  a: (...args: T) => boolean,
  // @ts-ignore
): (...args: T) => boolean {
  // ..
}

/**
 * complement of function(combining)
 */
export const complement = curryN(1, _complement) as Complement;
