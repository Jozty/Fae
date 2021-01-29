import { describe, it } from './_describe.ts'
import {
  dropLastWhile,
  pipe,
  append,
  flip,
  transduce,
  _,
} from '../mod.ts'
import { eq } from './utils/utils.ts'
import type { Predicate1 } from '../utils/types.ts'

describe('dropLastWhile', () => {
  it('should skip elements while the function reports `true`', () => {
    eq(
      dropLastWhile((x: number) => x >= 5, [1, 3, 5, 7, 9]),
      [1, 3],
    )
  })

  it('should return an empty list for an empty list', () => {
    eq(
      dropLastWhile(() => false, []),
      [],
    )
    eq(
      dropLastWhile(() => true, []),
      [],
    )
  })

  it('should start at the right arg and acknowledges undefined', () => {
    const f: Predicate1<number | undefined> = (
      x: number | undefined,
    ) => x !== void 0
    const sublist = dropLastWhile(f, [1, 3, void 0, 5, 7])
    eq(sublist.length, 3)
    eq(sublist[0], 1)
    eq(sublist[1], 3)
    eq(sublist[2], void 0)
  })

  it('can operate on strings', () => {
    const f = (x: string) => x !== 'd'
    const d = dropLastWhile(f)
    eq(d('transducer'), 'transd')
  })

  it('can act as a transducer', () => {
    const f: Predicate1<number> = (x: number) => x < 7
    const dropLt7 = dropLastWhile(f)
    const t1 = pipe(dropLt7)
    eq(transduce(t1, flip(append), [], [1, 3, 5, 7, 9, 1, 2]), [
      1,
      3,
      5,
      7,
      9,
    ])
    eq(transduce(t1, flip(append), [], [1, 3, 5]), [])
  })

  it('should work on curried versions', () => {
    const a = (x: string) => x !== 'd'
    const b = 'transducer'
    const expected = 'transd'

    eq(dropLastWhile(a, b), expected)
    eq(dropLastWhile(a)(b), expected)
    eq(dropLastWhile(_, b)(a), expected)
  })
})
