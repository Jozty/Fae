import { describe, it } from "./_describe.ts"
import { or } from '../mod.ts'
import { eq } from "./utils/utils.ts"

describe('or', () => {

  it('should compare two values', () => {
    let a = {a: 2}
    eq(or(true, true), true)
    eq(or(true, false), true)
    eq(or(false, true), true)
    eq(or(false, false), false)
    eq(or(2, 1), 2)
    eq(or("Fae", "Best"), "Fae")
    eq(or(a, 3), {a: 2})
    eq(or([1, 2, 3], [2, 10]), [1, 2, 3])
  })
  
})