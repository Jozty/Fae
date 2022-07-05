// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import { dispatch } from './utils/dispatch.ts';
import curryN from './utils/curry_n.ts';
import type { InferType, PH } from './utils/types.ts';
import { take } from './take.ts';
import DropLastTransformer from './utils/Transformers/dropLast.ts';

// @types
type DropLast_2 = <L extends any[] | string>(list: L) => InferType<L>;

type DropLast_1<L extends any[] | string> = (n: number) => InferType<L>;

type DropLast =
  & ((n: number) => DropLast_2)
  & (<L extends any[] | string>(n: PH, list: L) => DropLast_1<L>)
  & (<L extends any[] | string>(n: number, list: L) => InferType<L>);

function _dropLast<L extends T[] | string, T>(n: number, list: L) {
  return take(n < list.length ? list.length - n : 0, list);
}

const dispatchedDropLast = dispatch(
  DropLastTransformer as any,
  _dropLast,
);

/**
 * Returns all but last `n` elements of given list.
 *
 * Acts as a transducer if a transformer is passed in place of `list`
 *
 *      Fae.dropLast(1, ['foo', 'bar', 'baz']); //=> ['foo', 'bar']
 *      Fae.dropLast(2, ['foo', 'bar', 'baz']); //=> ['foo']
 *      Fae.dropLast(3, ['foo', 'bar', 'baz']); //=> []
 *      Fae.dropLast(4, ['foo', 'bar', 'baz']); //=> []
 *      Fae.dropLast(3, 'foobar');               //=> 'foo'
 */
export const dropLast: DropLast = curryN(2, dispatchedDropLast);
