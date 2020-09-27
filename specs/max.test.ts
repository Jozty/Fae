import { describe, it } from './_describe.ts'
import { max } from '../mod.ts'
import { eq } from './utils/utils.ts'
//TODO singla-shivam (Returns the second argument if one of the arguments is NaN)

describe('max', () => {
  it('should return the larger of its two arguments', () => {
    eq(max(-10, 8), 8)
    eq(max(10, -8), 10)
    eq(max(-10, -8), -8)
    eq(max(-10.888, -8.635), -8.635)
    eq(max(-10000000, 8555533), 8555533)
    eq(max(-10.4, 8.4), 8.4)
    eq(max(-10, 0.8263), 0.8263)
    eq(max(10, 8), 10)
    eq(max(NaN, 1000), 1000)
    eq(max(0, NaN), NaN)
    eq(max(Infinity, NaN), NaN)
    eq(max(NaN, 0), 0)
    eq(max(0, NaN), NaN)
    eq(max(Infinity, NaN), NaN)
    eq(max(NaN, Infinity), Infinity)
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
