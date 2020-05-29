import { describe, it } from "./_describe.ts"
import { tail } from '../mod.ts'
import { eq } from "./utils/utils.ts"

describe('tail', () => {


  it('should return the tail of an ordered collection', () => {
    eq(tail([1, 2, 3]), [2, 3])
    eq(tail([2, 3]), [3])
    eq(tail([3]), [])
    eq(tail([]), [])

    eq(tail('abc'), 'bc')
    eq(tail('bc'), 'c')
    eq(tail('c'), '')
    eq(tail(''), '')
  })
})