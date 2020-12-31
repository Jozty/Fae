import { describe, it } from './_describe.ts'
import { slice, _ } from '../mod.ts'
import { eq } from './utils/utils.ts'

describe('slice', () => {
  it('should retrieve the proper sub list of a list', () => {
    const list = [8, 6, 7, 5, 3, 0, 9]
    eq(slice(2, 5, list), [7, 5, 3])
  })

  it('should handle array-like object', function () {
    const args = (function (...args: number[]) {
      return args
    })(1, 2, 3, 4, 5)
    eq(slice(1, 4, args), [2, 3, 4])
  })

  it('can operate on strings', () => {
    const sliceA = slice(_, _, 'abc')
    eq(sliceA(0, 0), '')
    eq(sliceA(0, 1), 'a')
    eq(sliceA(0, 2), 'ab')
    eq(sliceA(0, 3), 'abc')
    eq(sliceA(0, 4), 'abc')
    eq(sliceA(1, 0), '')
    eq(sliceA(1, 1), '')
    eq(sliceA(1, 2), 'b')
    eq(sliceA(1, 3), 'bc')
    eq(sliceA(1, 4), 'bc')
    eq(sliceA(0, -4), '')
    eq(sliceA(0, -3), '')
    eq(sliceA(0, -2), 'a')
    eq(sliceA(0, -1), 'ab')
    eq(sliceA(0, -0), '')
    eq(sliceA(-2, -4), '')
    eq(sliceA(-2, -3), '')
    eq(sliceA(-2, -2), '')
    eq(sliceA(-2, -1), 'b')
    eq(sliceA(-2, -0), '')
  })

  it('should work with curried calls too', () => {
    const a = 2
    const b = 5
    const c = [8, 6, 7, 5, 3, 0, 9]
    const expected = [7, 5, 3]

    const s_2_3 = slice(a)

    eq(s_2_3(b)(c), expected)
    eq(s_2_3(b, c), expected)
    eq(s_2_3(_, c)(b), expected)
    eq(s_2_3(b, _)(c), expected)

    const s_1_3 = slice(_, b)

    eq(s_1_3(a)(c), expected)
    eq(s_1_3(a, c), expected)
    eq(s_1_3(_, c)(a), expected)
    eq(s_1_3(a, _)(c), expected)

    const s_1_2 = slice(_, _, c)

    eq(s_1_2(a)(b), expected)
    eq(s_1_2(a, b), expected)
    eq(s_1_2(_, b)(a), expected)
    eq(s_1_2(a, _)(b), expected)

    const s_3 = slice(a, b)
    eq(s_3(c), expected)

    const s_2 = slice(a, _, c)
    eq(s_2(b), expected)

    const s_1 = slice(_, b, c)
    eq(s_1(a), expected)
  })
})
