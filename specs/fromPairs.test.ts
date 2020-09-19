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
  })

  it('should gives later entries precedence over earlier ones', () => {
    eq(
      fromPairs([
        ['x', 1],
        ['x', 2],
      ]),
      { x: 2 },
    )
  })
})
