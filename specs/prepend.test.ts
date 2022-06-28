import { describe, it } from './_describe.ts'
import { prepend, _ } from '../mod.ts'
import { eq } from './utils/utils.ts'

describe('prepend', () => {
  it('should add the element to the beginning of the list', () => {
    eq(prepend('x', ['y', 'z']), ['x', 'y', 'z'])
    eq(prepend(['a', 'z'], ['x', 'y'] as (string | string[])[]), [
      ['a', 'z'],
      'x',
      'y',
    ])
  })

  it('should not mutate original array', () => {
    const arr = [1, 2, 3]
    const arr2 = [...arr]
    eq(prepend(-13, arr), [-13, 1, 2, 3])
    eq(arr, arr2)
  })

  it('should work on empty list', () => {
    eq(prepend(1, []), [1])
  })

  it('should work with curried versions too', () => {
    eq(prepend(-1)([1, 2]), [-1, 1, 2])
    eq(prepend(_, [1, 2])(-1), [-1, 1, 2])
  })
})
