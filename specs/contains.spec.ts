import { describe, it } from "./_describe.ts"
import { contains , _ } from '../mod.ts'
import { eq } from "./utils/utils.ts"

describe('contains', () => {
  const list: ArrayLike<any> = [
    10,
    20,
    undefined,
    NaN,
    {a: 20, b: NaN, c: undefined},
    Infinity,
  ]

  const c = (contains(_, list))

  it('should be declared correctly', () => {
    eq(c(10), true)
    eq(c(undefined), true)
    eq(c(NaN), false)
    eq(c(Infinity), true)
    eq(c({b: NaN}), false)    
    eq(c(200), false)
  })
  
})
