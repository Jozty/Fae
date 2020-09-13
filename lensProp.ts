import { lens, Lens, Getter, Setter } from './lens.ts'
import { prop as prp } from './prop.ts'
import curryN from './utils/curry_n.ts'
import type { PH } from './utils/types.ts'
import { assoc } from './assoc.ts'

// @types
type LensProp = (<T, F>(prop: string | number) => Lens<T, F>)
  & ((prop?: PH) => LensProp)

function _lensProp<T, F>(prop: string | number): Lens<T, F> {
  return lens(prp(prop) as Getter<T, F>, assoc(prop) as any as Setter<T, F>)
}

/**
 * Returns a lens whose focus is the specified property
 * 
 *      const xLens = Fae.lensProp('x')
 *      Fae.view(xLens, {x: 1, y: 2})
 */
export const lensProp: LensProp = curryN(1, _lensProp)
