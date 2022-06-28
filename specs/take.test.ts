import { describe, it } from './_describe.ts'
import {
  take,
  _,
  pipe,
  map,
  filter,
  transduce,
  append,
  flip,
} from '../mod.ts'
import { eq } from './utils/utils.ts'

describe('take', () => {
  it('should take only the first `n` elements from a list', () => {
    eq(take(3, ['a', 'b', 'c', 'd', 'e', 'f', 'g']), ['a', 'b', 'c'])
    eq(take(0, ['a', 'b', 'c', 'd', 'e', 'f', 'g']), [])
  })

  it('should return only as many as the array can provide', () => {
    eq(take(3, [1, 2]), [1, 2])
    eq(take(3, []), [])
  })

  it('should return an equivalent list if `n` is < 0', () => {
    eq(take(-1, [1, 2, 3]), [1, 2, 3])
    eq(take(-Infinity, [1, 2, 3]), [1, 2, 3])
  })

  // it('should never returns the input array', () => {
  //   const xs = [1, 2, 3]

  //   strictNotEq(take(3, xs), xs)
  //   strictNotEq(take(Infinity, xs), xs)
  //   strictNotEq(take(-1, xs), xs)
  // })

  it('should operate on strings', () => {
    eq(take(3, 'Ramda'), 'Ram')
    eq(take(2, 'Ramda'), 'Ra')
    eq(take(1, 'Ramda'), 'R')
    eq(take(0, 'Ramda'), '')
  })

  it('should work with transformers', () => {
    const inc = (x: number) => x + 1
    const even = (x: number) => (x & 1) === 0
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    const t1 = pipe(map(inc), filter(even), take(2))

    eq(t1(arr), [2, 4])
    eq(transduce(t1, flip(append), [], arr), [3])

    const t2 = pipe(filter(even), take(2), map(inc))

    eq(t2(arr), [3, 5])
    eq(transduce(t2, flip(append), [], arr), [2])

    const t3 = pipe(filter(even), take(0), map(inc))

    eq(t3(arr), [])
    eq(transduce(t3, flip(append), [], arr), [])
  })

  it('should work on curried versions', () => {
    const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g']
    const expected = ['a', 'b', 'c']

    eq(take(3, arr), expected)
    eq(take(3)(arr), expected)
    eq(take(_, arr)(3), expected)
  })
})
