import { lens, Lens } from './lens.ts'
import { prop as prp } from './prop.ts'
import curryN from './utils/curry_n.ts'
import { Curry } from './utils/types.ts'
import { assoc } from './assoc.ts'

function _lensProp<F>(prop: string | number): Lens<F> {
  // @ts-ignore
  return lens(prp(prop), assoc(prop))
}

/**
 * Returns a lens whose focus is the specified property
 * 
 *      const xLens = Fae.lensProp('x')
 *      Fae.view(xLens, {x: 1, y: 2})
 */
export const lensProp: Curry<typeof _lensProp> = curryN(1, _lensProp)
