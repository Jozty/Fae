import { describe, it } from "./_describe.ts"
import { and } from '../mod.ts'
import { eq } from "./utils/utils.ts"

describe('and', () => {

  it('should compare two values properly', () =>  {
    eq(and(true, true), true)
    eq(and(true, false), false)
    eq(and(false, true), false)
    eq(and(false, false), false)
    eq(and(2, 1), 1)
  })
  
})