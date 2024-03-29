// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import { Lens, lens, LensGetter, LensSetter } from './lens.ts';
import { prop as prp } from './prop.ts';
import type { Prop } from './prop.ts';
import { assoc } from './assoc.ts';

/**
 * Returns a lens whose focus is the specified property
 *
 *      const xLens = Fae.lensProp('x')
 *      Fae.view(xLens, {x: 1, y: 2})
 */
export function lensProp<T, F>(prop: Prop): Lens<T, F> {
  return lens(
    prp(prop) as LensGetter<T, F>,
    // TODO
    // deno-lint-ignore no-explicit-any
    (assoc(prop) as any) as LensSetter<T, F>,
  );
}
