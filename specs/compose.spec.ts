import { describe, it } from "./_describe.ts"
import { eq } from "./utils/utils.ts"
import {
  compose,
  map,
  inc,
  filter,
  take,
  tap,
  dec, Predicate1,
} from '../mod.ts'

describe('compose', () => {
  const even: Predicate1 = (a: number) => (a & 1) === 0
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  it('should do function composition', () => {
    const c1 = compose(
      // @ts-ignore
      take(3),
      // @ts-ignore
      filter(even),
      // @ts-ignore
      map(inc)
    )
    eq(c1(arr), [2, 4, 6])

    const c2 = compose(
      take(3),
      filter(even),
      map
    )
    eq(c2(inc)(arr), [2, 4, 6])

    let y: number[]
    const c3 = compose(
      take(3),
      filter(even),
      // @ts-ignore
      tap((x: number[]) => y = x),
      map
    )
    eq(c3(dec)(arr), [0, 2, 4])
    eq(y, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
  })
})