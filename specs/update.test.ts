import { describe, it } from './_describe.ts'
import { update, _ } from '../mod.ts'
import { eq } from './utils/utils.ts'

describe('update', () => {
  it('should update the value at the given index of the supplied array', () => {
    eq(update(2, 4, [0, 1, 2, 3]), [0, 1, 4, 3])
  })

  it('should offset negative indexes from the end of the array', () => {
    eq(update(-3, 4, [0, 1, 2, 3]), [0, 4, 2, 3])
  })

  it('should return unmodified new array if the supplied index is out of bounds', () => {
    const list = [0, 1, 2, 3]
    eq(update(4, 4, list), list)
    eq(update(-5, 4, list), list)
  })

  it('should not mutate the original array', () => {
    const list = [0, 1, 2, 3]
    eq(update(2, 4, list), [0, 1, 4, 3])
    eq(list, [0, 1, 2, 3])
  })

  it('should curry the arguments', () => {
    eq(update(2)(4)([0, 1, 2, 3]), [0, 1, 4, 3])
  })

  it('should accept an array-like object', () => {
    function args() {
      return arguments
    }
    // @ts-ignore
    eq(update(2, 4, args(0, 1, 2, 3)), [0, 1, 4, 3])
  })

  it('should work on curried version too', () => {
    const a = -3
    const b = 4
    const c = [0, 1, 2, 3]
    const expected = [0, 4, 2, 3]

    const u_2_3 = update(a)

    eq(u_2_3(b)(c), expected)
    eq(u_2_3(b, c), expected)
    eq(u_2_3(_, c)(b), expected)
    eq(u_2_3(b, _)(c), expected)

    const u_1_3 = update(_, b)

    eq(u_1_3(a)(c), expected)
    eq(u_1_3(a, c), expected)
    eq(u_1_3(_, c)(a), expected)
    eq(u_1_3(a, _)(c), expected)

    const u_1_2 = update(_, _, c)

    eq(u_1_2(a)(b), expected)
    eq(u_1_2(a, b), expected)
    eq(u_1_2(_, b)(a), expected)
    eq(u_1_2(a, _)(b), expected)

    const u_3 = update(a, b)
    eq(u_3(c), expected)

    const u_2 = update(a, _, c)
    eq(u_2(b), expected)

    const u_1 = update(_, b, c)
    eq(u_1(a), expected)
  })
})
