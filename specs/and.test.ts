import { describe, it } from './_describe.ts'
import { and } from '../mod.ts'
import { eq } from './utils/utils.ts'

describe('and', () => {
  it('should compare two values properly', () => {
    eq(and(true, true), true)
    eq(and(true, false), false)
    eq(and(false, true), false)
    eq(and(false, false), false)
    eq(and(and(true, true), true), true)
    eq(and(and(true, false), true), false)
    eq(and(and(false, true), true), false)
    eq(and(and(false, false), true), false)
    eq(and(undefined, true), false)
    eq(and(undefined, false), false)
    eq(and(undefined, undefined), false)
    eq(and(true, undefined), false)
    eq(and(2, 1), true)
  })
})
