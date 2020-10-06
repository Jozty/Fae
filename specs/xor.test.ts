import { describe, it } from './_describe.ts'
import { xor, _ } from '../mod.ts'
import { eq } from './utils/utils.ts'

describe('xor', () => {
  it('should compare two values with exclusive or', () => {
    eq(xor(true, true), false)
    eq(xor(true, false), true)
    eq(xor(false, true), true)
    eq(xor(false, false), false)
  })

  it('should return false when both values are true', () => {
    eq(xor(true, 'foo'), false)
    eq(xor(42, true), false)
    eq(xor('foo', 42), false)
    eq(xor({}, true), false)
    eq(xor(true, []), false)
    eq(xor([], {}), false)
    eq(xor(new Date(), true), false)
    eq(xor(true, Infinity), false)
    eq(xor(Infinity, new Date()), false)
  })

  it('should return false when both values are false', () => {
    eq(xor(null, false), false)
    // fae-no-check
    eq(xor(false, undefined as any), false)
    eq(xor(undefined, null), false)
    eq(xor(0, false), false)
    eq(xor(false, NaN), false)
    eq(xor(NaN, 0), false)
    eq(xor('', false), false)
  })

  it('should return true when one argument is true and the other is false', () => {
    eq(xor('foo', null), true)
    eq(xor(null, 'foo'), true)
    eq(xor(undefined, 42), true)
    // fae-no-check
    eq(xor(42, undefined as any), true)
    eq(xor(Infinity, NaN), true)
    eq(xor(NaN, Infinity), true)
    eq(xor({}, ''), true)
    eq(xor('', {}), true)
    eq(xor(new Date(), 0), true)
    eq(xor(0, new Date()), true)
    eq(xor([], null), true)
    eq(xor(undefined, []), true)
  })

  it('should return a curried function', () => {
    eq(xor(true)(true), false)
    eq(xor(true)(false), true)
    eq(xor(false)(true), true)
    eq(xor(false)(false), false)
    eq(xor(_, "")(undefined), false)
    eq(xor("")(null), false)
    eq(xor(undefined)(undefined), false)
    eq(xor(112)(undefined), true)
    eq(xor(undefined)(112), true)
    eq(xor("sfd")(112), false)
    eq(xor("sfd")([]), false)
  })
})
