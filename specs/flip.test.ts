import { describe, it } from "./_describe.ts"
import { flip } from '../mod.ts'
import { eq } from "./utils/utils.ts"
import { getFunctionLength } from "../utils/get.ts"

describe('flip', () => {
  const f = (a: string, b: string, c: string)  => a + ' ' + b + ' ' + c
  it('should return a function which inverts the first two arguments to the supplied function', () => {
    const g = flip(f)
    eq(f('a', 'b', 'c'), 'a b c')
    eq(g('a', 'b', 'c'), 'b a c')
  });

  it('should return a curried function', () => {
    const g = flip(f)('a')
    eq(g('b', 'c'), 'b a c')
  })

  it('should return a function with the correct arity', () => {
    const f2 = (a: string, b: string)  => a + ' ' + b
    const f3 = (a: string, b: string, c: string)  => a + ' ' + b + ' ' + c
    eq(getFunctionLength(flip(f2)), 2)
    eq(getFunctionLength(flip(f3)), 3)
  })
})