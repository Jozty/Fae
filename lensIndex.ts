// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import { lens, Lens, LensSetter, LensGetter } from './lens.ts'
import { nth } from './nth.ts'
import { update } from './update.ts'
import curryN from './utils/curry_n.ts'

// @types
type LensIndex = <T, F>(index: number) => Lens<T, F>

function _lensIndex<T, F>(index: number): Lens<T, F> {
  return lens(
    nth(index) as LensGetter<T, F>,
    (update(index) as any) as LensSetter<T, F>,
  )
}

/**
 * Returns a lens whose focus is the specified index.
 *
 *      const headLens = Fae.lensIndex(0)
 *      Fae.view(headLens, ['a', 'b', 'c'])            // 'a'
 *      Fae.set(headLens, 'x', ['a', 'b', 'c'])        // ['x', 'b', 'c']
 *      Fae.over(headLens, (x: string) => x.toUpperCase(), ['a', 'b', 'c']) // ['A', 'b', 'c']
 */
export const lensIndex: LensIndex = curryN(1, _lensIndex)
