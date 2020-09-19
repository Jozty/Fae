import { describe, it } from './_describe.ts'
import { range, rangeUntil } from '../mod.ts'
import { eq } from './utils/utils.ts'

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
    result.push(5)
    eq(range(10, 5), [])
  })
})
