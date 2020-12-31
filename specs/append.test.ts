import { describe, it } from './_describe.ts'
import { eq } from './utils/utils.ts'
import { append, _ } from '../mod.ts'

describe('append', () => {
  it('should add the element to end of the list', () => {
    const arr = [1, 2, 3, 4, 5]
    const arr2 = [...arr]

    eq(append(6, arr), [...arr, 6])
    eq(arr, arr2)

    eq(append('ads', []), ['ads'])
    eq(append(['abc'], []), [['abc']])
    eq(append(1, [1, 1, 1]), [1, 1, 1, 1])
    eq(
      append({ a: 1, b: 2 }, [
        { a: 1, b: 2 },
        { a: 1, b: 2 },
        { a: 1, b: 2 },
      ]),
      [
        { a: 1, b: 2 },
        { a: 1, b: 2 },
        { a: 1, b: 2 },
        { a: 1, b: 2 },
      ],
    )
  })

  it('should work on curried versions too', () => {
    const a = 9
    const b = [1, 2, 3, 4, 5, 6, 7, 8]
    const expected = [1, 2, 3, 4, 5, 6, 7, 8, 10]

    eq(append(a, b), expected)
    eq(append(a)(b), expected)
    eq(append(a, _)(b), expected)
    eq(append(_, b)(a), expected)
  })
})
