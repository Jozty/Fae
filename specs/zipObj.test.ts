import { describe, it } from './_describe.ts'
import { zipObj, _ } from '../mod.ts'
import { eq } from './utils/utils.ts'

describe('zipObj', () => {
  it('should combine an array of keys with an array of values into a single object', () => {
    eq(zipObj(['a', 'b', 'c'], [1, 2, 3]), { a: 1, b: 2, c: 3 })
  })

  it('should ignore extra values', () => {
    eq(zipObj(['a', 'b', 'c'], [1, 2, 3, 4, 5, 6, 7]), {
      a: 1,
      b: 2,
      c: 3,
    })
  })

  it('should ignore extra keys', () => {
    eq(zipObj(['a', 'b', 'c', 'd', 'e', 'f'], [1, 2, 3]), {
      a: 1,
      b: 2,
      c: 3,
    })
  })

  it('should last one wins when there are duplicate keys', () => {
    eq(zipObj(['a', 'b', 'c', 'a'], [1, 2, 3, 'LAST']), {
      a: 'LAST',
      b: 2,
      c: 3,
    })
  })

  it('should work on curried version too', () => {
    const a = ['a', 'b', 'c']
    const b = [1, 2, 3]
    const expected = { a: 1, b: 2, c: 3 }

    eq(zipObj(a, b), expected)
    eq(zipObj(a)(b), expected)
    eq(zipObj(a, _)(b), expected)
    eq(zipObj(a, _)(b), expected)
    eq(zipObj(_, b)(a), expected)
  })
})
