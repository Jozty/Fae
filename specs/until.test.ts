import { describe, it } from './_describe.ts'
import { until, _ } from '../mod.ts'
import { eq } from './utils/utils.ts'

describe('until', () => {
  it('should work properly', () => {
    const gt100 = (x: number) => x > 100
    const square = (x: number) => x * x
    eq(until(gt100, square, 2), 256)
  })

  it('should work on curried version too', () => {
    const a = (x: number) => x > 100
    const b = (x: number) => 2 * x + 1
    const c = 3
    const expected = 127

    const u_2_3 = until(a)

    eq(u_2_3(b)(c), expected)
    eq(u_2_3(b, c), expected)
    eq(u_2_3(_, c)(b), expected)
    eq(u_2_3(b, _)(c), expected)

    const u_1_3 = until(_, b)

    eq(u_1_3(a)(c), expected)
    eq(u_1_3(a, c), expected)
    eq(u_1_3(_, c)(a), expected)
    eq(u_1_3(a, _)(c), expected)

    const u_1_2 = until(_, _, c)

    eq(u_1_2(a)(b), expected)
    eq(u_1_2(a, b), expected)
    eq(u_1_2(_, b)(a), expected)
    eq(u_1_2(a, _)(b), expected)

    const u_3 = until(a, b)
    eq(u_3(c), expected)

    const u_2 = until(a, _, c)
    eq(u_2(b), expected)

    const u_1 = until(_, b, c)
    eq(u_1(a), expected)
  })
})
