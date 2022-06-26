import { describe, it } from './_describe.ts'
import { range, rangeUntil, _ } from '../mod.ts'
import { eq, thr } from './utils/utils.ts'

describe('range, rangeUntil', () => {
  it('should return list of numbers both inclusive', () => {
    eq(range(0, 5), [0, 1, 2, 3, 4, 5])
    eq(range(4, 7), [4, 5, 6, 7])
    eq(range(2, 2), [2])
    eq(range(2, 3), [2, 3])
  })

  it('should return list of numbers `to` exclusive', () => {
    eq(rangeUntil(0, 5), [0, 1, 2, 3, 4])
    eq(rangeUntil(4, 7), [4, 5, 6])
    eq(rangeUntil(2, 2), [])
    eq(rangeUntil(2, 3), [2])
  })

  it('should return an empty array if from > to', () => {
    const result = range(10, 5)
    eq(result, [])
  })

  it('should work with curried versions too', () => {
    eq(range(1)(5), [1, 2, 3, 4, 5])
    eq(range(_, 5)(1), [1, 2, 3, 4, 5])

    eq(rangeUntil(1)(5), [1, 2, 3, 4])
    eq(rangeUntil(_, 5)(1), [1, 2, 3, 4])
  })

  it('should not work with float/NaN and infinity values', () => {
    // range
    thr(
      () => range(Infinity, 2),
      'The arguments should be finite integer values but got\n\tfrom: Infinity\n\tto: 2',
    )
    thr(
      () => range(12, -Infinity),
      'The arguments should be finite integer values but got\n\tfrom: 12\n\tto: -Infinity',
    )
    thr(
      () => range(NaN, 2),
      'The arguments should be finite integer values but got\n\tfrom: NaN\n\tto: 2',
    )
    thr(
      () => range(12, NaN),
      'The arguments should be finite integer values but got\n\tfrom: 12\n\tto: NaN',
    )
    thr(
      () => range(1.2, 12),
      'The arguments should be finite integer values but got\n\tfrom: 1.2\n\tto: 12',
    )
    thr(
      () => range(12, 1.2),
      'The arguments should be finite integer values but got\n\tfrom: 12\n\tto: 1.2',
    )

    // rangeUntil
    thr(
      () => rangeUntil(Infinity, 2),
      'The arguments should be finite integer values but got\n\tfrom: Infinity\n\tto: 2',
    )
    thr(
      () => rangeUntil(12, -Infinity),
      'The arguments should be finite integer values but got\n\tfrom: 12\n\tto: -Infinity',
    )
    thr(
      () => rangeUntil(NaN, 2),
      'The arguments should be finite integer values but got\n\tfrom: NaN\n\tto: 2',
    )
    thr(
      () => rangeUntil(12, NaN),
      'The arguments should be finite integer values but got\n\tfrom: 12\n\tto: NaN',
    )
    thr(
      () => rangeUntil(1.2, 12),
      'The arguments should be finite integer values but got\n\tfrom: 1.2\n\tto: 12',
    )
    thr(
      () => rangeUntil(12, 1.2),
      'The arguments should be finite integer values but got\n\tfrom: 12\n\tto: 1.2',
    )
  })
})
