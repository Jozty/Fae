// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import curryN from './utils/curry_n.ts';
import type { PH } from './utils/types.ts';

// @types
type Trim_2 = (t: string) => string;

type Trim_1 = (str: string) => string;

type Trim =
  & ((str: string) => Trim_2)
  & ((str: PH, t: string) => Trim_1)
  & ((str: string, t: string) => string);

function escapeRegEx(str: string) {
  return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

function _trim(str: string, t: string) {
  t = escapeRegEx(t);
  const regEx = new RegExp(`^(${t})+|(${t})+$`, 'g');
  return t ? str.replace(regEx, '') : str.trim();
}

/**
 * Trims the string `str` from both end with `t`.
 * Trims with white space if `t` is [''], with `t` otherwise.
 *
 *      Fae.trim('   xyz  ', ''); // 'xyz
 *      Fae.trim('[[Hello]]]', '[') // Hello]]]
 *      Fae.trim('[[Hello]]]', ']]') // [[Hello]]
 */
export const trim = curryN(2, _trim) as Trim;
