import { describe, it } from './_describe.ts'
import { takeLast, _ } from '../mod.ts'
import { eq, strictNotEq } from './utils/utils.ts'

describe('takeLast', () => {
  it('should take only the last `n` elements from a list', () => {
    eq(takeLast(3, ['a', 'b', 'c', 'd', 'e', 'f', 'g']), [
      'e',
      'f',
      'g',
    ])
  })

  it('should return only as many as the array can provide', () => {
    eq(takeLast(3, [1, 2]), [1, 2])
    eq(takeLast(3, []), [])
  })

  it('should return an equivalent list if `n` is < 0', () => {
    eq(takeLast(-1, [1, 2, 3]), [1, 2, 3])
    eq(takeLast(-Infinity, [1, 2, 3]), [1, 2, 3])
  })

  it('should never returns the input array', () => {
    const xs = [1, 2, 3]

    strictNotEq(takeLast(3, xs), xs)
    strictNotEq(takeLast(Infinity, xs), xs)
    strictNotEq(takeLast(-1, xs), xs)
  })

  it('can operate on strings', () => {
    eq(takeLast(3, 'Ramda'), 'mda')
  })

  it('should handle zero correctly', () => {
    eq(takeLast(0, [1, 2, 3]), [])
  })

  it('should work on curried versions', () => {
    const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g']
    const expected = ['e', 'f', 'g']

    eq(takeLast(3, arr), expected)
    eq(takeLast(3)(arr), expected)
    eq(takeLast(3, _)(arr), expected)
    eq(takeLast(_, arr)(3), expected)
  })
})
