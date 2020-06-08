import { describe, it } from "./_describe.ts"
import { empty } from '../mod.ts'
import { eq } from "./utils/utils.ts"

describe('empty', () => {
  
  it('returns empty array given array', function() {
    eq(empty([1, 2, 3]), [])
  })

  it('returns empty object given object', function() {
    eq(empty({x: 1, y: 2}), {})
  })

  it('returns empty string given string', function() {
    eq(empty('abc'), '')
    eq(empty(new String('abc')), '')
  })

})