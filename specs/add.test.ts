import { describe, it, expect } from './_describe.ts'
import { add } from '../mod.ts'
import { eq } from './utils/utils.ts'

describe('add', () => {
  it('should be declared correctly', () => {
    eq(add(10, 20), 30)
  })
})
