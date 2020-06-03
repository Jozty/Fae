import lens, { Lens } from './lens.ts'
import nth from './nth.ts'
import update from './update.ts'
import curryN from './utils/curry_n.ts'
import { Curry1 } from './utils/types.ts'

function lensIndex(index: number): Lens {
  return lens(nth(index), update(index))
}

/** Returns a lens whose focus is the specified index. 
 *
 *      const headLens = Fae.lensIndex(0)
 *      Fae.view(headLens, ['a', 'b', 'c'])            //=> 'a'
 *      Fae.set(headLens, 'x', ['a', 'b', 'c'])        //=> ['x', 'b', 'c']
 *      Fae.over(headLens, (x: string) => x.toUpperCase(), ['a', 'b', 'c']) //=> ['A', 'b', 'c']
 */
export default curryN(1, lensIndex) as Curry1<number, Lens>
