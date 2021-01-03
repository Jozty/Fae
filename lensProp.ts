// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import { lens, Lens, LensGetter, LensSetter } from './lens.ts'
import { prop as prp } from './prop.ts'
import type { Prop } from './prop.ts'
import curryN from './utils/curry_n.ts'
import { assoc } from './assoc.ts'

// @types
type LensProp = <T, F>(prop: Prop) => Lens<T, F>

function _lensProp<T, F>(prop: Prop): Lens<T, F> {
  return lens(
    prp(prop) as LensGetter<T, F>,
    (assoc(prop) as any) as LensSetter<T, F>,
  )
}

/**
 * Returns a lens whose focus is the specified property
 *
 *      const xLens = Fae.lensProp('x')
 *      Fae.view(xLens, {x: 1, y: 2})
 */
export const lensProp: LensProp = curryN(1, _lensProp)
