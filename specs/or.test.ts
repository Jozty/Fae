import { describe, it } from './_describe.ts'
import { or, _ } from '../mod.ts'
import { eq } from './utils/utils.ts'

describe('or', () => {
  it('should compare two values', () => {
    let a = { a: 2 }
    eq(or(true, true), true)
    eq(or(true, false), true)
    eq(or(false, true), true)
    eq(or(false, false), false)
    eq(or(2, 1), true)
    eq(or('Fae', 'Best'), true)
    eq(or(a, 3), true)
    eq(or([1, 2, 3], [2, 10]), true)
    // fae-no-check
    eq(or(undefined, undefined as any), false)
    // fae-no-check
    eq(or(true, undefined as any), true)
    eq(or(0, true), true)
    eq(or('', false), false)
    eq(or(null, false), false)
    eq(or(NaN, false), false)
    eq(or('a', false), true)
    eq(or([], false), true)
    eq(or({}, false), true)
    eq(or({ 1: 2 }, false), true)
    eq(or([1, 2, 3], false), true)
    //prettier-ignore
    eq(or(function () {}, false),true,)
    eq(or([], {}), true)
    //prettier-ignore
    eq(or(function () {}, ''),true,)
    //prettier-ignore
    eq(or('', ""), false)
  })


  it('should work on curried versions too', () => {
    eq(or(_, "")(undefined), false)
    eq(or("")(1n), true)
    eq(or(undefined)(undefined), false)
    eq(or(112)(undefined), true)
    eq(or(undefined)(112), true)
    eq(or("sfd")(112), true)
    eq(or("sfd")([]), true)
  })
})
