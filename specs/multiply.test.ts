import { describe, it, expect } from './_describe.ts'
import { multiply, _ } from '../mod.ts'
import { eq } from './utils/utils.ts'

describe('multiply', () => {
  it('should multiply two numbers', () => {
    eq(multiply(25, 5), 125)
    eq(multiply(25, 4), 100)
    eq(multiply(NaN, 10), NaN)
    eq(multiply(Infinity, 4), Infinity)
    eq(multiply(25, Infinity), Infinity)
    eq(multiply(Infinity, Infinity), Infinity)
    eq(multiply(0, 0), 0)
    eq(multiply(25, 0), 0)
  })
  
  it('should test curried versions too', () => {
    eq(multiply(25)(5), 125)
    eq(multiply(_, 4)(25), 100)
    eq(multiply(4, _)(25), 100)
    eq(multiply(_, _)(25)(4), 100)
  })
})
