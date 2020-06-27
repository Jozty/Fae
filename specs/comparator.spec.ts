import { describe, it } from "./_describe.ts"
import { comparator, flip } from '../mod.ts'
import { eq, thr } from "./utils/utils.ts"

describe('comparator', () => {
  const func1 = (a: string, b: string) => a[2] < b[2]
  const func2 = (a: number, b: number) => (a & b) === 0
  const func3 = (a: number[], b: number[]) => a.length < b.length
  const func4 = (a: { x: string }, b: { x: string }) => a.x < b.x

  const c1 = comparator(func1)
  const c2 = comparator(func2)
  const c3 = comparator(func3)
  const c4 = comparator(func4)
  it('should work fine', () => {
    eq(c1('ab', 'cd'), 0)
    eq(c1('Shivam', 'Singla'), -1)
    eq(c1('abc', 'abc'), 0)
    eq(c1('abd', 'abc'), 1)

    eq(c2(2, 4), -1)
    eq(c2(3, 7), 0)
    eq(c2(7, 3), 0)
    eq(c2(4, 2), -1)

    eq(c3([1, 2], [1, 2, 3]), -1)
    eq(flip(c3)([1, 2], [1, 2, 3]), 1)
    eq(c3([1, 2], [21, 43]), 0)

    eq(c4({x : 2}, {x: 3}), -1)
    eq(c4({x : 2}, {x: 2}), 0)
    eq(c4({x : 3}, {x: 2}), 1)
  })
})