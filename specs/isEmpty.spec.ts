import { describe, it } from "./_describe.ts"
import { isEmpty } from '../mod.ts'
import { eq } from "./utils/utils.ts"

// TODO : (ch-shubham) make the commented lines work

describe('isEmpty', () => {
  
  it('returns false for null', () => {
    eq(isEmpty(null), false)
  })

  it('returns false for undefined', () => {
    eq(isEmpty(undefined), false)
  })

  it('returns true for empty string', () => {
    eq(isEmpty(''), true)
    eq(isEmpty(' '), false)
  })

  it('returns true for empty array', () => {
    eq(isEmpty([]), true)
    eq(isEmpty([[]]), false)
  })

  it('returns true for empty object', () => {
    eq(isEmpty({}), true)
    eq(isEmpty({x: 0}), false)
  })

  // it('returns true for empty arguments object', () => {
  //   eq(isEmpty((function() { return arguments })()), true)
  //   eq(isEmpty((function() { return arguments })()), false)
  // })

  it('returns false for every other value', () => {
    eq(isEmpty(0), false)
    eq(isEmpty(NaN), false)
    eq(isEmpty(['']), false)
  })
  
})