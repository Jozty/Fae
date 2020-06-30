import { describe, it } from "./_describe.ts"
import { prepend, _ } from '../mod.ts'
import { eq } from "./utils/utils.ts"

describe('prepend', () => {
  it('should add the element to the beginning of the list', () => {
    eq(prepend('x', ['y', 'z']), ['x', 'y', 'z'])
    eq(prepend(['a', 'z'], ['x', 'y'] as (string | string[])[]), [['a', 'z'], 'x', 'y'])
  })

  it('should work on empty list', () => {
    eq(prepend(1, []), [1])
  })

})