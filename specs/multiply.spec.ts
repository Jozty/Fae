import { describe, it, expect } from "./_describe.ts"
import { multiply } from '../mod.ts'
import { eq } from "./utils/utils.ts"

describe('divide', () => {
  it('should divide two numbers', () => {
    eq(multiply(25, 5), 125)
    eq(multiply(25, 4), 100)
    eq(multiply(NaN, 10), NaN)
    eq(multiply(Infinity, 4), Infinity)
    eq(multiply(25, Infinity), Infinity)
    eq(multiply(Infinity, Infinity), Infinity)
    eq(multiply(0, 0), 0)
    eq(multiply(25, 0), 0)
  })
})