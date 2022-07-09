// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import type { Lens, LensTransformer } from './lens.ts';
import curryN from './utils/curry_n.ts';
import type { PH } from './utils/types.ts';

// @types
type View_2<T, F> = (target: T) => F;

type View_1<T> = <F>(lens: Lens<T, F>) => F;

type View =
  & (<T, F>(lens: Lens<T, F>) => View_2<T, F>)
  & (<T>(lens: PH, target: T) => View_1<T>)
  & (<T, F>(lens: Lens<T, F>, target: T) => F);

function _viewTransformer<T, F>(focus: F): LensTransformer<T, F, F> {
  return {
    value: focus,
    transform(_, __) {
      return _viewTransformer(this.value);
    },
  };
}

function _view<T, F>(lens: Lens<T, F>, target: T): F {
  return lens(_viewTransformer)(target).value;
}

export const view: View = curryN(2, _view);
