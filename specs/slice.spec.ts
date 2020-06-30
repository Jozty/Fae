import { describe, it } from "./_describe.ts"
import { slice, _ } from '../mod.ts'
import { eq } from "./utils/utils.ts"

describe('slice', () => {
  it('should retrieve the proper sub list of a list', () => {
    const list = [8, 6, 7, 5, 3, 0, 9]
    eq(slice(2, 5, list), [7, 5, 3])
  })

  it('should handle array-like object', function() {
    const args = (function(...args: number[]) { return args }(1, 2, 3, 4, 5))
    eq(slice(1, 4, args), [2, 3, 4])
  })

  it('can operate on strings', () => {
    const sliceA = slice(_, _, 'abc')
    eq(sliceA(0, 0), '')
    eq(sliceA(0, 1), 'a')
    eq(sliceA(0, 2), 'ab')
    eq(sliceA(0, 3), 'abc')
    eq(sliceA(0, 4), 'abc')
    eq(sliceA(1, 0), '')
    eq(sliceA(1, 1), '')
    eq(sliceA(1, 2), 'b')
    eq(sliceA(1, 3), 'bc')
    eq(sliceA(1, 4), 'bc')
    eq(sliceA(0, -4), '')
    eq(sliceA(0, -3), '')
    eq(sliceA(0, -2), 'a')
    eq(sliceA(0, -1), 'ab')
    eq(sliceA(0, -0), '')
    eq(sliceA(-2, -4), '')
    eq(sliceA(-2, -3), '')
    eq(sliceA(-2, -2), '')
    eq(sliceA(-2, -1), 'b')
    eq(sliceA(-2, -0), '')
  })
})