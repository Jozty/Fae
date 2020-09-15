import { describe, it } from "./_describe.ts"
import { endsWith } from '../mod.ts'
import { eq } from "./utils/utils.ts"

describe('startsWith', () => {
  it('should return true when a string ends with the provided value', () => {
    eq(endsWith('c', 'abc'), true)
  })

  it('should return true when a long string ends with the provided value', () => {
    eq(endsWith('ology', 'astrology'), true)
  })

  it('should return false when a string does not end with the provided value', () => {
    eq(endsWith('b', 'abc'), false)
  })

  it('should return false when a long string does not end with the provided value', () => {
    eq(endsWith('olog', 'astrology'), false)
  })

  it('should return true when an array ends with the provided value', () => {
    eq(endsWith(['c'], ['a', 'b', 'c']), true)
  })

  it('should return true when an array ends with the provided values', () => {
    eq(endsWith(['b', 'c'], ['a', 'b', 'c']), true)
  })

  it('should return false when an array does not end with the provided value', () => {
    eq(endsWith(['b'], ['a', 'b', 'c']), false)
  })

  it('should return false when an array does not end with the provided values', () => {
    eq(endsWith(['a', 'b'], ['a', 'b', 'c']), false)
  })
})
