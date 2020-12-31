import { describe, it } from './_describe.ts'
import { drop, _ } from '../mod.ts'
import { eq, strictNotEq } from './utils/utils.ts'

describe('drop', () => {
  it('should skip the first `n` elements from a list, returning the remainder', () => {
    eq(drop(3, ['a', 'b', 'c', 'd', 'e', 'f', 'g']), [
      'd',
      'e',
      'f',
      'g',
    ])
  })

  it('should return an empty array if `n` is too large', () => {
    eq(drop(20, ['a', 'b', 'c', 'd', 'e', 'f', 'g']), [])
  })

  it('should return an equivalent list if `n` is <= 0', () => {
    eq(drop(0, [1, 2, 3]), [1, 2, 3])
    eq(drop(-1, [1, 2, 3]), [1, 2, 3])
    eq(drop(-Infinity, [1, 2, 3]), [1, 2, 3])
  })

  it('should never return the input array', () => {
    const xs = [1, 2, 3]

    strictNotEq(drop(0, xs), xs)
    strictNotEq(drop(-1, xs), xs)
  })

  it('should operate on strings', () => {
    eq(drop(3, 'operate'), 'rate')
    eq(drop(4, 'operate'), 'ate')
    eq(drop(5, 'operate'), 'te')
    eq(drop(6, 'operate'), 'e')
    eq(drop(7, 'operate'), '')
    eq(drop(8, 'operate'), '')
    eq(drop(-1, 'operate'), 'operate')
  })

  it('should work on curried versions', () => {
    const a = 3
    const b = 'operate'
    const expected = 'rate'

    eq(drop(a, b), expected)
    eq(drop(a)(b), expected)
    eq(drop(_, b)(a), expected)
  })
})
