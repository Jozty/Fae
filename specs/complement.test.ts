import { describe, it } from './_describe.ts'
import { complement } from '../mod.ts'
import { eq } from './utils/utils.ts'

describe('complement', () => {
  it('should create boolean-returning function that reverses another', () => {
    const even = (x: number) => x % 2 === 0
    const f = complement(even)
    eq(f(8), false)
    eq(f(13), true)
    eq(f(-1), true)
    eq(f(-4), false)
    eq(f(0), false)
    eq(f(NaN), true)
    eq(f(Infinity), true)
    
  
  })

  it('should accept a function that take multiple parameters', () => {
    const between = (a: number, b: number, c: number) =>
      a < b && b < c
    const f = complement(between)
    eq(f(4, 5, 11), false)
    eq(f(12, 2, 6), true)
    eq(f(12, 24, 12), true)
    eq(f(12, -2, 6), true)
    eq(f(2, 2, 4), true)
    eq(f(2, 4, 4), true)
    eq(f(0, 0, 0), true)
    eq(f(-12, -2, 0), false)
    
  })
  
})
