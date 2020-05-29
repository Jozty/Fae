import { describe, it } from "./_describe.ts"
import { eq } from "./utils/utils.ts"
import { append } from '../mod.ts'

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
      append(
        {a: 1, b: 2},
        [
          {a: 1, b: 2},
          {a: 1, b: 2},
          {a: 1, b: 2},
        ]
      ),
      [
        {a: 1, b: 2},
        {a: 1, b: 2},
        {a: 1, b: 2},
        {a: 1, b: 2},
      ]
    )
  })
})