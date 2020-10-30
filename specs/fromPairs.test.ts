import { describe, it } from './_describe.ts'
import { fromPairs } from '../mod.ts'
import { eq } from './utils/utils.ts'

describe('fromPairs', () => {
  it('should combine an array of two-element arrays into an object', () => {
    eq(
      fromPairs([
        ['a', 1],
        ['b', 2],
        ['c', 3],
      ]),
      { a: 1, b: 2, c: 3 },
    )
    eq(
      fromPairs([
        ['a', 1],
        ['b', 2],
        ['c', 3],
        ['d', 4],
      ]),
      { a: 1, b: 2, c: 3, d: 4 },
    )
    eq(
      fromPairs([
        [1, 1],
        [2, 2],
        [3, 3],
        [4, 4],
      ]),
      { 1: 1, 2: 2, 3: 3, 4: 4 },
    )
  })

  it('should gives later entries precedence over earlier ones', () => {
    eq(
      fromPairs([
        ['x', 1],
        ['x', 2],
      ]),
      { x: 2 },
    )
    eq(
      fromPairs([
        ['x', 1],
        ['x', 2],
        ['x', 4],
        ['x', 3],
      ]),
      { x: 3 },
    )
    eq(
      fromPairs([
        ['x', 1],
        ['x', 2],
        ['y', 1],
        ['y', 2],
        ['y', 3],
      ]),
      { x: 2, y: 3 },
    )
  })
})
