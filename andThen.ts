// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import curryN from './utils/curry_n.ts';
import type { Func, PH } from './utils/types.ts';
import { assertPromise } from './utils/assert.ts';

// @types
type AndThen_2<T, R> = (p: PromiseLike<T>) => PromiseLike<R>;

type AndThen_1<T> = <R>(f: Func<[T], R>) => PromiseLike<R>;

type AndThen =
  & (<T, R>(f: Func<[T], R>) => AndThen_2<T, R>)
  & (<T>(a: PH, p: PromiseLike<T>) => AndThen_1<T>)
  & (<T, R>(f: Func<[T], R>, p: PromiseLike<T>) => PromiseLike<R>);

function _andThen<T, R>(f: Func<[T], R>, p: PromiseLike<T>) {
  assertPromise('andThen', p);
  return p.then(f);
}

/**
 * Returns the result of applying the onSuccess function to the value inside
 * a successfully resolved promise. This is useful for working with promises
 * inside function compositions.
 */
export const andThen = curryN(2, _andThen) as AndThen;
