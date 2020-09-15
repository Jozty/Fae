import { describe, it, expect } from "./_describe.ts"
import { not } from '../mod.ts'
import { eq } from "./utils/utils.ts"

describe('not', () => {
  it('should be properly declared',() => {
    eq(not(true), false)
    eq(not(''), true)
    eq(not(1), false)
    eq(not(0), true)
    eq(not(undefined), true)
    eq(not({}), false)
    eq(not(null), true)
    eq(not([]), false)
    eq(not(![]), true)
    eq(not(NaN), true)
  })
})