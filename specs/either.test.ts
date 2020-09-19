import { describe, it } from './_describe.ts'
import { either } from '../mod.ts'
import { eq } from './utils/utils.ts'

describe('either', () => {
  it('should combine two boolean-returning functions into one', () => {
    let even = (x: number) => (x & 1) === 0
    let gt10 = (x: number) => x > 10
    let f = either(even, gt10)
    eq(f(8), true)
    eq(f(13), true)
    eq(f(7), false)
  })

  it('should accept functions that take multiple parameters', () => {
    let between = (a: number, b: number, c: number) => a < b && b < c
    let total20 = (a: number, b: number, c: number) =>
      a + b + c === 20
    let f = either(between, total20)
    eq(f(4, 5, 8), true)
    eq(f(12, 2, 6), true)
    eq(f(7, 5, 1), false)
  })
})
