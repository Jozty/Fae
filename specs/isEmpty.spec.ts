import { describe, it } from "./_describe.ts"
import { isEmpty } from '../mod.ts'
import { eq } from "./utils/utils.ts"

// TODO : (ch-shubham) make the commented lines work

describe('isEmpty', () => {
  
  it('returns false for null', function() {
    eq(isEmpty(null), false)
  })

  it('returns false for undefined', function() {
    eq(isEmpty(undefined), false)
  })

  it('returns true for empty string', function() {
    eq(isEmpty(''), true)
    eq(isEmpty(' '), false)
  })

  it('returns true for empty array', function() {
    eq(isEmpty([]), true)
    eq(isEmpty([[]]), false)
  })

  it('returns true for empty object', function() {
    eq(isEmpty({}), true)
    eq(isEmpty({x: 0}), false)
  })

  // it('returns true for empty arguments object', function() {
  //   eq(isEmpty((function() { return arguments })()), true)
  //   eq(isEmpty((function() { return arguments })()), false)
  // })

  it('returns false for every other value', function() {
    eq(isEmpty(0), false)
    eq(isEmpty(NaN), false)
    eq(isEmpty(['']), false)
  })
})