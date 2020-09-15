import { describe, it, expect } from "./_describe.ts"
import { min } from '../mod.ts'
import { eq } from "./utils/utils.ts"

describe('min', () => {
  it('should returns the larger of its two arguments', () => {
    eq(min(-10, 8), -10)
    eq(min(10, -8), -8)
    eq(min(NaN, 1000), 1000)
    eq(min(NaN, 0), 0)
    eq(min(Infinity, NaN), NaN)
  })

  it('should work for any String type', () => {
    eq(min('a', 'z'), 'a')
    eq(min('z', 'a'), 'a')
  })
})