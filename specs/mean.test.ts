import { describe, it, expect } from './_describe.ts'
import { mean } from '../mod.ts'
import { eq } from './utils/utils.ts'

describe('mean', () => {
  it('should return mean of non-empty list correctly', () => {
    eq(mean([1]), 1)
    eq(mean([7, 6]), 6.5)
    eq(mean([2, 7, 9]), 6)
    eq(mean([2, 7, 9, 10]), 7)

  })

  it('returns Infinity if Infinity is in list', () => {
    eq(mean([Infinity, 7, 9, 10]), Infinity)
    eq(mean([-Infinity, 7, 9, 10]), -Infinity)
  })

  it('returns NaN if Nan is in list', () => {
    eq(mean([NaN, 2, 3, 5]), NaN)
  })
})
