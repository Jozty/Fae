import { describe, it } from "./_describe.ts"
import { crossproduct } from '../mod.ts'
import { eq } from "./utils/utils.ts"


describe('crossproduct', () => {
  let a = [1, 2, null]
  let b = ['a', 'b', 'c']

  it('should return an empty list if either input list is empty', () => {
    eq(crossproduct([], [1, 2, 3]), [])
    eq(crossproduct([1, 2, 3], []), [])
  })

  it('should create the collection of all cross-product pairs of its parameters', () => {
    eq(crossproduct(a, b), [[1, 'a'], [1, 'b'], [1, 'c'], [2, 'a'], [2, 'b'], [2, 'c'], [null, 'a'], [null, 'b'], [null, 'c']])
  })
})