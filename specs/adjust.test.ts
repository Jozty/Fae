import { describe, it } from './_describe.ts'
import { adjust, add, _ } from '../mod.ts'
import { eq } from './utils/utils.ts'

describe('adjust', () => {
  it('should apply the given function to the bue at the given index of the supplied array', () => {
    eq(adjust(2, add(1), [0, 1, 2, 3]), [0, 1, 3, 3])
  })

  it('should offset negative indexes from the end of the array', () => {
    eq(adjust(-3, add(1), [0, 1, 2, 3]), [0, 2, 2, 3])
  })

  it('should return unmodified new array if the supplied index is out of bounds', () => {
    const list = [0, 1, 2, 3]
    eq(adjust(4, add(1), list), list)
    eq(adjust(-5, add(1), list), list)
  })

  it('should not mutate the original array', () => {
    const list = [0, 1, 2, 3]
    eq(adjust(2, add(1), list), [0, 1, 3, 3])
    eq(list, [0, 1, 2, 3])
  })

  it('should accept an array-like object', () => {
    function args() {
      return arguments
    }
    // @ts-ignore
    eq(adjust(2, add(1), args(0, 1, 2, 3)), [0, 1, 3, 3])
  })

  it('should work with curried calls too', () => {
    const a = 2
    const b = add(1)
    const c = [0, 1, 2, 3]
    const expected = [0, 1, 3, 3]

    const a_2_3 = adjust(a)

    eq(a_2_3(b)(c), expected)
    eq(a_2_3(b, c), expected)
    eq(a_2_3(_, c)(b), expected)
    eq(a_2_3(b, _)(c), expected)

    const a_1_3 = adjust(_, b)

    eq(a_1_3(a)(c), expected)
    eq(a_1_3(a, c), expected)
    eq(a_1_3(_, c)(a), expected)
    eq(a_1_3(a, _)(c), expected)

    const a_1_2 = adjust(_, _, c)

    eq(a_1_2(a)(b), expected)
    eq(a_1_2(a, b), expected)
    eq(a_1_2(_, b)(a), expected)
    eq(a_1_2(a, _)(b), expected)

    const a_3 = adjust(a, b)
    eq(a_3(c), expected)

    const a_2 = adjust(a, _, c)
    eq(a_2(b), expected)

    const a_1 = adjust(_, b, c)
    eq(a_1(a), expected)
  })
})
