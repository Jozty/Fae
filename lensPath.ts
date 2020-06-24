import { lens, Lens } from './lens.ts'
import { assocPath } from './assocPath.ts'
import curryN from './utils/curry_n.ts'
import { Curry } from './utils/types.ts'
import { Path } from './paths.ts'
import { path as pth } from './path.ts'

function _lensPath<F>(path: Path): Lens<F> {
  // @ts-ignore
  return lens(pth(path), assocPath(path))
}

/**
 * Returns a lens whose focus is the specified path. 
 * 
 *      const xHeadYLens = Fae.lensPath(['x', 0, 'y'])
 *      Fae.view(xHeadYLens, {x: [{y: 2, z: 3}, {y: 4, z: 5}]}) // {x: [{y: 1, z: 3}, {y: 4, z: 5}]}
 */
export const lensPath: Curry<typeof _lensPath> = curryN(1, _lensPath)
