import { describe, it } from './_describe.ts'
import { groupWith, equals } from '../mod.ts'
import { eq } from './utils/utils.ts'

describe('groupWith', () => {
  it('should split the list into groups according to the grouping function', () => {
    eq(groupWith(equals, [1, 2, 2, 3]), [[1], [2, 2], [3]])
    eq(groupWith(equals, [1, 1, 1, 1]), [[1, 1, 1, 1]])
    eq(groupWith(equals, [1, 2, 3, 4]), [[1], [2], [3], [4]])
    eq(groupWith(equals, [1, 2, 3, 2]), [[1], [2], [3], [2]])
  })

  it('should split the list into "streaks" testing adjacent elements', () => {
    const isConsecutive = function (a: number, b: number) {
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
    eq(groupWith(isConsecutive, [1, 2, 9, 10, 3, 4]), [
      [1, 2],
      [9, 10],
      [3, 4],
    ])
  })

  it('should return an empty array if given an empty array', () => {
    eq(groupWith(equals, []), [])
  })

  it('should also work on strings', () => {
    eq(groupWith(equals, 'Mississippi'), [
      'M',
      'i',
      'ss',
      'i',
      'ss',
      'i',
      'pp',
      'i',
    ])
    eq(groupWith(equals, 'Finaallyy'), [
      'F',
      'i',
      'n',
      'aa',
      'll',
      'yy',
    ])
    eq(groupWith(equals, 'Finaallyyaa'), [
      'F',
      'i',
      'n',
      'aa',
      'll',
      'yy',
      'aa',
    ])
  })
})
