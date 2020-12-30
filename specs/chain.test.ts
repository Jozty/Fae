import { describe, it } from './_describe.ts'
import { chain, _ } from '../mod.ts'
import { eq } from './utils/utils.ts'

describe('chain', () => {
  const add1 = (x: number) => [x + 1]
  const dec = (x: number) => [x - 1]
  const times2 = (x: number) => [x * 2]

  const list = [10, undefined, 35, Infinity]
  let c = chain(_, list)

  it('maps a function over a nested list and returns the result', function () {
    // fae-no-check
    // @ts-ignore
    eq(c(times2), [20, NaN, 70, Infinity])
    // fae-no-check
    // @ts-ignore
    eq(c(add1), [11, NaN, 36, Infinity])
    // fae-no-check
    // @ts-ignore
    eq(c(dec), [9, NaN, 34, Infinity])
  })

  it('should work on curried versions too', () => {
    const list = [1, 2, 3, 4, 5]
    const duplicate = (x: number) => [x, x]
    const expected = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5]

    eq(chain(duplicate, list), expected)
    eq(chain(duplicate)(list), expected)
    eq(chain(_, list)(duplicate), expected)
  })
})
