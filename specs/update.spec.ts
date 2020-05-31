import { describe, it } from "./_describe.ts"
import { update } from '../mod.ts'
import { eq } from "./utils/utils.ts"

describe('update', () => {
  it('should update the value at the given index of the supplied array', () => {
    eq(update(2, 4, [0, 1, 2, 3]), [0, 1, 4, 3])
  })

  it('should offset negative indexes from the end of the array', () => {
    eq(update(-3, 4, [0, 1, 2, 3]), [0, 4, 2, 3])
  })

  it('should return unmodified new array if the supplied index is out of bounds', () => {
    const list = [0, 1, 2, 3]
    eq(update(4, 4, list), list)
    eq(update(-5, 4, list), list)
  })

  it('should not mutate the original array', () => {
    const list = [0, 1, 2, 3]
    eq(update(2, 4, list), [0, 1, 4, 3])
    eq(list, [0, 1, 2, 3])
  })

  it('should curry the arguments', () => {
    eq(update(2)(4)([0, 1, 2, 3]), [0, 1, 4, 3])
  })

  it('should accept an array-like object', () => {
    function args() {
      return arguments
    }
    // @ts-ignore
    eq(update(2, 4, args(0, 1, 2, 3)), [0, 1, 4, 3])
  })

})

