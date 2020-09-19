import { describe, it } from './_describe.ts'
import { zip } from '../mod.ts'
import { eq } from './utils/utils.ts'

describe('zip', () => {
  it('should return an array of "tuples"', () => {
    const a = [1, 2, 3]
    const b = [100, 200, 300]

    eq(zip(a, b), [
      [1, 100],
      [2, 200],
      [3, 300],
    ])
  })

  it('should return a list as long as the shorter of the lists input', () => {
    const a = [1, 2, 3]
    const b = [100, 200, 300, 400]
    const c = [10, 20]

    eq(zip(a, b), [
      [1, 100],
      [2, 200],
      [3, 300],
    ])
    eq(zip(a, c), [
      [1, 10],
      [2, 20],
    ])
  })
})
