import { describe, it } from './_describe.ts'
import { sort, comparator } from '../mod.ts'
import { eq } from './utils/utils.ts'

describe('sort', () => {
  it('should sort the elements of a list without affecting original', () => {
    const greater = (a: number, b: number) => a < b
    const comp = comparator(greater)
    const list = [3, 1, 8, 1, 2, 5]
    eq(sort(comp, list), [1, 1, 2, 3, 5, 8])
    eq(list, [3, 1, 8, 1, 2, 5])
  })
})
