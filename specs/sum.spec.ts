import { describe, it } from "./_describe.ts"
import { sum } from '../mod.ts'
import { eq } from "./utils/utils.ts"

describe('sum', () => {
  it('adds together the array of numbers supplied', () => {
    eq(sum([1, 2, 3, 4]), 10)
  })

  it('does not save the state of the accumulator', () => {
    eq(sum([1, 2, 3, 4]), 10)
    eq(sum([1]), 1)
    eq(sum([5, 5, 5, 5, 5]), 25)
  })
})
