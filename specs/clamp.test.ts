import { describe, it } from './_describe.ts'
import { clamp } from '../mod.ts'
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
})
