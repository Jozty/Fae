import { describe, it, expect } from "./_describe.ts"
import { add } from '../mod.ts'
import { eq } from "./utils/utils.ts"


describe('add', () => {
  it('should be declared correctly', () => {
    eq(add(10, 20), 30)
    eq(add(-10,10),0)
    eq(add(9999999,1),10000000)
    eq(add(1999999,1),2000000)
    eq(add(10,-1),9)
  })
})
