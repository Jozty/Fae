import { describe, it } from "./_describe.ts"
import { adjust, add } from '../mod.ts'
import { eq } from "./utils/utils.ts"


describe('adjust', () => {
  it('should apply the given function to the value at the given index of the supplied array', () => {
    // @ts-ignore
    eq(adjust(2, add(1), [0, 1, 2, 3]), [0, 1, 3, 3])
  })

  it('should offset negative indexes from the end of the array', () => {
    eq(adjust(-3, add(1), [0, 1, 2, 3]), [0, 2, 2, 3])
  })

  it('should return unmodified new array if the supplied index is out of bounds', () => {
    const list = [0, 1, 2, 3]
    eq(adjust(4, add(1), list), list)
    eq(adjust(-5, add(1), list), list)
  })

  it('should not mutate the original array', () => {
    const list = [0, 1, 2, 3]
    eq(adjust(2, add(1), list), [0, 1, 3, 3])
    eq(list, [0, 1, 2, 3])
  })

  it('should accept an array-like object', () => {
    function args() {
      return arguments
    }
    // @ts-ignore // ok
    eq(adjust(2, add(1), args(0, 1, 2, 3)), [0, 1, 3, 3])
  })

});
