import { describe, it, expect } from "./_describe.ts"
import { not } from '../mod.ts'
import { eq } from "./utils/utils.ts"

/**
  * @function
  * takes an argument and returns its not
*/

describe('not', () => {
  it('should be properly declared',() => {
    eq(not(true), false)
    eq(not(''), true)
    eq(not(1), false)
  })
})