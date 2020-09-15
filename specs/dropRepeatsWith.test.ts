import { describe, it } from "./_describe.ts"
import {
  dropRepeatsWith,
  pipe,
  append,
  flip,
  transduce,
  map,
  filter,
  range,
} from '../mod.ts'
import { eq, strictNotEq } from "./utils/utils.ts"


describe('dropRepeatsWith', () => {
  const obj = [
    {i: 1}, {i: 2}, {i: 3}, {i: 4}, {i: 5}, {i: 3}
  ]
  const obj2 = [
    {i: 1}, {i: 1}, {i: 1}, {i: 2}, {i: 3},
    {i: 3}, {i: 4}, {i: 4}, {i: 5}, {i: 3}
  ]
  const eqI = (a: any, b: any) => a.i === b.i

  it('should remove repeated elements based on predicate', () => {
    eq(dropRepeatsWith(eqI, obj2), obj)
    eq(dropRepeatsWith(eqI, obj), obj)
  })

  it('should keep elements from the left', () => {
    eq(
      dropRepeatsWith(eqI, [{i: 1, n: 1}, {i: 1, n: 2}, {i: 1, n: 3}, {i: 4, n: 1}, {i: 4, n: 2}]),
      [{i: 1, n: 1}, {i: 4, n: 1}]
    )
  })

  it('should return an empty array for an empty array', () => {
    eq(dropRepeatsWith(eqI, []), [])
  })

  it('should act as a transducer', () => {
    const t1 = pipe(
      dropRepeatsWith(eqI)
    )
    eq(transduce(t1, flip(append), [], obj2), obj)
  })

})
