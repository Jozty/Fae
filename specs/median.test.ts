import { describe, it, expect } from './_describe.ts'
import { median } from '../mod.ts'
import { eq } from './utils/utils.ts'

describe('median', () => {
  it('should return middle value of an odd-length list', () => {
    eq(median([2]), 2)
    eq(median([2, 9, 7]), 7)
  })

  it('should return mean of two middle values of a nonempty even-length list', () => {
    eq(median([10, 20]), 15)
    eq(median([7, 2, 10, 9]), 8)
  })
})
