import { describe, it } from './_describe.ts'
import { head } from '../mod.ts'
import { eq, thr } from './utils/utils.ts'

describe('head', () => {
  it('should return the first element of an ordered collection', () => {
    eq(head([1, 2, 3]), 1)
    eq(head([2, 3]), 2)
    eq(head([3]), 3)
    eq(head([]), undefined)

    eq(head('abc'), 'a')
    eq(head('bc'), 'b')
    eq(head('c'), 'c')
    eq(head(''), '')
  })

  it('should throw if applied to null or undefined', () => {
    thr(
      // @ts-ignore
      () => head(null),
      'The functor should be an array like or iterable/iterator',
    )
    // @ts-ignore
    thr(
      () => head(undefined),
      'The functor should be an array like or iterable/iterator',
    )
  })
})
