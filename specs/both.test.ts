import { describe, it } from './_describe.ts'
import { both, _ } from '../mod.ts'
import { eq, noEq } from './utils/utils.ts'

describe('both', () => {
  const even = (x: number) => (x & 1) == 0
  const gt10 = (x: number) => x > 10

  it('should combine two boolean-returning functions into one', () => {
    const f = both(even, gt10)
    eq(f(8), false)
    eq(f(13), false)
    eq(f(14), true)
  })

  it('should combine two non-boolean-returning functions into one', () => {
    const nonEmptyString = (s: string) => !s
    const emptyString = (s: string) => s

    const f = both(nonEmptyString, emptyString)
    eq(f(''), false)
    eq(f('sdf'), false)
    eq(f('sf'), false)
    // @ts-expect-error: The combined function should return boolean only
    noEq(f('sf'), 'sf')
  })

  it('should accept functions that take multiple parameters', () => {
    const between = (a: number, b: number, c: number) =>
      a < b && b < c
    const total20 = (a: number, b: number, c: number) =>
      a + b + c === 20

    const f = both(between, total20)
    eq(f(4, 5, 11), true)
    eq(f(12, 2, 6), false)
    eq(f(5, 6, 15), false)
  })

  it('should work on curried version too', () => {
    const f1 = both(even, gt10)
    eq(f1(8), false)

    const f2 = both(even)
    eq(f2(gt10)(8), false)

    const f3 = both(_, gt10)
    eq(f3(even)(8), false)
  })
})
