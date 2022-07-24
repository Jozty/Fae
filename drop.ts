// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import { slice } from './slice.ts';
import { dispatch } from './utils/dispatch.ts';
import DropTransformer from './utils/Transformers/drop.ts';
import curryN from './utils/curry_n.ts';
import type { InferType, PH } from './utils/types.ts';

// @types
type Drop_2 = <L extends unknown[] | string>(list: L) => InferType<L>;

type Drop_1<L extends unknown[] | string> = (n: number) => InferType<L>;

type Drop =
  & ((n: number) => Drop_2)
  & (<L extends unknown[] | string>(n: PH, list: L) => Drop_1<L>)
  & (<L extends unknown[] | string>(n: number, list: L) => InferType<L>);

function _drop<L extends unknown[] | string>(n: number, list: L) {
  return slice(Math.max(0, n), Infinity, list);
}

const dispatchedDrop = dispatch(DropTransformer, _drop);

/**
 * Returns all but first `n` elements of given list.
 *
 * Acts as a transducer if a transformer is passed in place of `list`
 *
 *      Fae.drop(1, ['foo', 'bar', 'baz']); //=> ['bar', 'baz']
 *      Fae.drop(2, ['foo', 'bar', 'baz']); //=> ['baz']
 *      Fae.drop(3, ['foo', 'bar', 'baz']); //=> []
 *      Fae.drop(4, ['foo', 'bar', 'baz']); //=> []
 *      Fae.drop(3, 'foobar');               //=> 'bar'
 */
export const drop: Drop = curryN(2, dispatchedDrop);
