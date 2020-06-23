import { describe, it } from "./_describe.ts"
import {
  dropLastWhile,
  pipe,
  append,
  flip,
  transduce,
  Predicate1,
} from '../mod.ts'
import { eq, strictNotEq } from "./utils/utils.ts"

describe('dropLastWhile', () => {
  it('should skip elements while the function reports `true`', () => {
    eq(dropLastWhile(
      <Predicate1>((x: number) => x >= 5),
      [1, 3, 5, 7, 9]
    ), [1, 3])
  })

  it('should return an empty list for an empty list', () => {
    eq(dropLastWhile(() => false, []), [])
    eq(dropLastWhile(() => true, []), [])
  })

  it('should start at the right arg and acknowledges undefined', () => {
    const sublist = dropLastWhile(
      <Predicate1>((x: number) => x !== void 0),
      [1, 3, void 0, 5, 7]
    )
    eq(sublist.length, 3)
    eq(sublist[0], 1)
    eq(sublist[1], 3)
    eq(sublist[2], void 0)
  })

  it('can operate on strings', () => {
    eq(dropLastWhile(
      <Predicate1>((x: string) => x !== 'd'),
      'transducer'
    ), 'transd')
  })

  it('can act as a transducer', () => {
    const dropLt7 = dropLastWhile(<Predicate1>((x: number) => x < 7))
    const t1 = pipe(
      dropLt7
    )
    eq(transduce(t1, flip(append), [], [1, 3, 5, 7, 9, 1, 2]), [1, 3, 5, 7, 9])
    eq(transduce(t1, flip(append), [], [1, 3, 5]), [])
  })
})
