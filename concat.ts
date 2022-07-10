// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import curryN from './utils/curry_n.ts';
import type { InferType, PH } from './utils/types.ts';
import { isArray, isString } from './utils/is.ts';

// @types
type Concat_2<L extends unknown[] | string> = (b: L) => InferType<L>;

type Concat_1<L extends unknown[] | string> = (a: L) => InferType<L>;

type Concat =
  & (<L extends unknown[] | string>(a: L) => Concat_2<InferType<L>>)
  & (<L extends unknown[] | string>(a: PH, b: L) => Concat_1<InferType<L>>)
  & (<L extends unknown[] | string>(a: L, b: L) => InferType<L>);

function _concat<L extends unknown[] | string, T>(a: L, b: L): L {
  if (isArray<T>(a) && isArray<T>(b)) return a.concat(b) as L;
  if (isString(a) && isString(b)) return (a + b) as L;
  throw new TypeError(
    'Types are not compatible. Both the arguments passed must be of same type.',
  );
}

/**
 * Concat two arrays or strings.
 * Both the arguments passed must be of same type.
 */
export const concat = curryN(2, _concat) as Concat;
