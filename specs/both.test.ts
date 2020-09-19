import { describe, it } from './_describe.ts'
import { both } from '../mod.ts'
import { eq } from './utils/utils.ts'

describe('both', () => {
  it('should combine two boolean-returning functions into one', () => {
    let even = (x: number) => (x & 1) == 0
    let gt10 = (x: number) => x > 10
    let f = both(even, gt10)
    eq(f(8), false)
    eq(f(13), false)
    eq(f(14), true)
  })

  it('should accept functions that take multiple parameters', () => {
    let between = (a: number, b: number, c: number) => a < b && b < c
    let total20 = (a: number, b: number, c: number) =>
      a + b + c === 20
    let f = both(between, total20)
    eq(f(4, 5, 11), true)
    eq(f(12, 2, 6), false)
    eq(f(5, 6, 15), false)
  })
})
