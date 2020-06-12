import { describe, it } from "./_describe.ts"
import { empty } from '../mod.ts'
import { eq } from "./utils/utils.ts"

describe('empty', () => {
  
  it('should return empty array given array', () => {
    eq(empty([1, 2, 3]), [])
  })

  it('should return empty object given object', () => {
    eq(empty({x: 1, y: 2}), {})
  })

  it('should return empty string given string', () => {
    eq(empty('abc'), '')
    eq(empty(new String('abc')), '')
  })

})