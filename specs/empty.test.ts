import { describe, it } from './_describe.ts'
import { empty } from '../mod.ts'
import { eq } from './utils/utils.ts'

describe('empty', () => {
  it('should return empty array given array', () => {
    eq(empty([1, 2, 3]), [])
    eq(empty([1, 2, 3, 4, 5]), [])
    eq(empty([[1, 2], 3, [4, 5]]), [])
    eq(empty([[[1, 2], 3, [4, 5]]]), [])
  })

  it('should return empty object given object', () => {
    eq(empty({ x: 1, y: 2 }), {})
    eq(empty({ x: [1, 2] }), {})
    eq(empty({ x: { y: 2 } }), {})
  })

  it('should return empty string given string', () => {
    eq(empty('abc'), '')
    eq(empty('[1, 2, 3]'), '')
    eq(empty(new String('abc')), '')
    eq(empty(new Array([1, 2])), [])
  })
})
