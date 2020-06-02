import lens, { Lens } from './lens.ts'
import nth from './nth.ts'
import update from './update.ts'
import curryN from './utils/curry_n'
import { Curry1 } from './utils/types'

function lensIndex(index: number): Lens {
  return lens(nth(index), update(index))
}

/** Returns a lens whose focus is the specified index. */
export default curryN(1, lensIndex) as Curry1<number, Lens>
