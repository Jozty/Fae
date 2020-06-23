import { lens, Lens } from './lens.ts'
import { prop as prp } from './prop.ts'
import curryN from './utils/curry_n.ts'
import { Curry1 } from './utils/types.ts'
import { assoc } from './assoc.ts'

function _lensProp(prop: string | number): Lens {
  // @ts-ignore
  return lens(prp(prop), assoc(prop))
}

/**
 * Returns a lens whose focus is the specified property
 * 
 *      const xLens = Fae.lensProp('x')
 *      Fae.view(xLens, {x: 1, y: 2})
 */
export const lensProp: Curry1<string | number, Lens> = curryN(1, _lensProp)
