// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import { slice } from './slice.ts';
import { dispatch } from './utils/dispatch.ts';
import TakeTransformer from './utils/Transformers/take.ts';
import curryN from './utils/curry_n.ts';
import type { InferType, PH } from './utils/types.ts';

// @types
type Take_2 = <L extends ArrayLike<any> | string>(list: L) => InferType<L>;

type Take_1<L extends ArrayLike<any> | string> = (n: number) => InferType<L>;

type Take =
  & ((n: number) => Take_2)
  & (<L extends ArrayLike<any> | string>(
    n: PH,
    list: L,
  ) => Take_1<InferType<L>>)
  & (<L extends ArrayLike<any> | string>(n: number, list: L) => InferType<L>);

function _take<L extends ArrayLike<any> | string, T>(
  n: number,
  list: L,
) {
  return slice(0, n < 0 ? Infinity : n, list);
}

const dispatchedTake = dispatch(TakeTransformer as any, _take);

/**
 * Returns first `n` elements of the array or string.
 *
 * Acts as a transducer if a transformer is given in `list`.
 */
export const take: Take = curryN(2, dispatchedTake);
