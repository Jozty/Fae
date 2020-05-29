import { describe, it, expect } from "./_describe.ts"
import { subtract } from '../mod.ts'
import { eq } from "./utils/utils.ts"


describe('subtract', () => {
  it('should be declared correctly', () => {
    eq(subtract(20, 10), 10)
  })
})
