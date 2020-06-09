import { describe, it } from "./_describe.ts"
import { or } from '../mod.ts'
import { eq } from "./utils/utils.ts"

describe('or', () => {

  it('should compare two values', () => {
    eq(or(true, true), true)
    eq(or(true, false), true)
    eq(or(false, true), true)
    eq(or(false, false), false)
  })
  
})