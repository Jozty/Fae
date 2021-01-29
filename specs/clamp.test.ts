import { describe, it } from './_describe.ts'
import { clamp, _ } from '../mod.ts'
import { eq } from './utils/utils.ts'

describe('clamp', () => {
  it('should clamp to the lower bound', () => {
    eq(clamp(1, 10, 0), 1)
    eq(clamp(3, 12, 1), 3)
    eq(clamp(-15, 3, -100), -15)
  })

  it('should clamp to the upper bound', () => {
    eq(clamp(1, 10, 20), 10)
    eq(clamp(3, 12, 23), 12)
    eq(clamp(-15, 3, 16), 3)
  })

  it('should leave it alone when within the bound', () => {
    eq(clamp(1, 10, 4), 4)
    eq(clamp(3, 12, 6), 6)
    eq(clamp(-15, 3, 0), 0)
  })

  it('should work with letters as well', () => {
    eq(clamp('d', 'n', 'f'), 'f')
    eq(clamp('d', 'n', 'a'), 'd')
    eq(clamp('d', 'n', 'q'), 'n')
  })

  it('should work with curried calls too', () => {
    const min = 3
    const max = 12
    const value = 23
    const expected = 12

    const c_2_3 = clamp(min)

    eq(c_2_3(max)(value), expected)
    eq(c_2_3(max, value), expected)
    eq(c_2_3(_, value)(max), expected)
    eq(c_2_3(max, _)(value), expected)

    const c_1_3 = clamp(_, max)

    eq(c_1_3(min)(value), expected)
    eq(c_1_3(min, value), expected)
    eq(c_1_3(_, value)(min), expected)
    eq(c_1_3(min, _)(value), expected)

    const c_1_2 = clamp(_, _, value)

    eq(c_1_2(min)(max), expected)
    eq(c_1_2(min, max), expected)
    eq(c_1_2(_, max)(min), expected)
    eq(c_1_2(min, _)(max), expected)

    const c_3 = clamp(min, max)
    eq(c_3(value), expected)

    const c_2 = clamp(min, _, value)
    eq(c_2(max), expected)

    const c_1 = clamp(_, max, value)
    eq(c_1(min), expected)
  })
})
