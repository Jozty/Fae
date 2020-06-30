import { lens, Lens, Getter, Setter } from './lens.ts'
import { assocPath } from './assocPath.ts'
import curryN from './utils/curry_n.ts'
import { PH } from './utils/types.ts'
import { Path } from './paths.ts'
import { path as pth } from './path.ts'

// @types
type LensPath = (<T, F>(path: Path) => Lens<T, F>)
  & ((path?: PH) => LensPath)

function _lensPath<T, F>(path: Path): Lens<T, F> {
  return lens(pth(path) as Getter<T, F>, assocPath(path) as any as Setter<T, F>)
}

/**
 * Returns a lens whose focus is the specified path. 
 * 
 *      const xHeadYLens = Fae.lensPath(['x', 0, 'y'])
 *      Fae.view(xHeadYLens, {x: [{y: 2, z: 3}, {y: 4, z: 5}]}) // {x: [{y: 1, z: 3}, {y: 4, z: 5}]}
 */
export const lensPath: LensPath = curryN(1, _lensPath)
