import { describe, it } from './_describe.ts'
import { aperture, pipe, append, transduce, flip } from '../mod.ts'
import { eq } from './utils/utils.ts'

describe('aperture', () => {
  const arr = [1, 2, 3, 4, 5, 6, 7]
  it('should creates a list of n-tuples from a list', () => {
    eq(aperture(1, arr), [[1], [2], [3], [4], [5], [6], [7]])
    eq(aperture(2, arr), [
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 7],
    ])
    eq(aperture(3, arr), [
      [1, 2, 3],
      [2, 3, 4],
      [3, 4, 5],
      [4, 5, 6],
      [5, 6, 7],
    ])
    eq(aperture(4, [1, 2, 3, 4]), [[1, 2, 3, 4]])
  })

  it('should returns an empty list when `n` > `list.length`', () => {
    eq(aperture(6, [1, 2, 3]), [])
    eq(aperture(1, []), [])
  })

  it('should act as a transducer', () => {
    const t1 = pipe(aperture(2))

    eq(t1(arr), [
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 7],
    ])
    eq(transduce(t1, flip(append), [], arr), [
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 7],
    ])

    const t2 = pipe(aperture(8))

    eq(t2(arr), [])
    eq(transduce(t2, flip(append), [], arr), [])
  })
})
