import { describe, it } from './_describe.ts'
import { groupWith, equals } from '../mod.ts'
import { eq } from './utils/utils.ts'

describe('groupWith', () => {
  it('should split the list into groups according to the grouping function', () => {
    eq(groupWith(equals, [1, 2, 2, 3]), [[1], [2, 2], [3]])
    eq(groupWith(equals, [1, 1, 1, 1]), [[1, 1, 1, 1]])
    eq(groupWith(equals, [1, 2, 3, 4]), [[1], [2], [3], [4]])
  })

  it('should split the list into "streaks" testing adjacent elements', () => {
    // @ts-ignore
    const isConsecutive = function (a, b) {
      return a + 1 === b
    }
    eq(groupWith(isConsecutive, []), [])
    eq(groupWith(isConsecutive, [4, 3, 2, 1]), [[4], [3], [2], [1]])
    eq(groupWith(isConsecutive, [1, 2, 3, 4]), [[1, 2, 3, 4]])
    eq(groupWith(isConsecutive, [1, 2, 2, 3]), [
      [1, 2],
      [2, 3],
    ])
    eq(groupWith(isConsecutive, [1, 2, 9, 3, 4]), [
      [1, 2],
      [9],
      [3, 4],
    ])
  })

  it('should return an empty array if given an empty array', () => {
    eq(groupWith(equals, []), [])
  })

  // TODO:
  // it('can be turned into the original list through concatenation', () => {
  //   var list = [1, 1, 2, 3, 4, 4, 5, 5]
  //   eq(R.unnest(groupWith(equals, list)), list)
  //   eq(R.unnest(groupWith(R.complement(equals), list)), list)
  //   eq(R.unnest(groupWith(R.T, list)), list)
  //   eq(R.unnest(groupWith(R.F, list)), list)
  // })

  it('should also work on strings', () => {
    eq(groupWith(equals)('Mississippi'), [
      'M',
      'i',
      'ss',
      'i',
      'ss',
      'i',
      'pp',
      'i',
    ])
  })
})
