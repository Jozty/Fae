import lens, { Lens } from './lens.ts'
import prp from './prop.ts'
import curryN from './utils/curry_n.ts'
import { Curry1 } from './utils/types.ts'
import assoc from './assoc.ts'

function lensProp(prop: string | number): Lens {
  return lens(prp(prop), assoc(prop))
}

/** Returns a lens whose focus is the specified property
 * 
 *      const xLens = Fae.lensProp('x')
 *      Fae.view(xLens, {x: 1, y: 2})
 */
export default curryN(1, lensProp) as Curry1<string | number, Lens>
