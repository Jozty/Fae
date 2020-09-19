import { describe, it, expect } from './_describe.ts'
import { max } from '../mod.ts'
import { eq } from './utils/utils.ts'

describe('max', () => {
  it('should return the larger of its two arguments', () => {
    eq(max(-10, 8), 8)
    eq(max(10, -8), 10)
    eq(max(NaN, 1000), 1000)
    eq(max(0, NaN), NaN)
    eq(max(Infinity, NaN), NaN)
  })

  it('should work for any orderable type', () => {
    let d1: Date = new Date('2001-01-01')
    let d2: Date = new Date('2002-02-02')

    eq(max(d1, d2), d2)
    eq(max(d2, d1), d2)
    eq(max('a', 'z'), 'z')
    eq(max('z', 'a'), 'z')
  })
})
