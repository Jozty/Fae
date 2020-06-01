import { describe, it } from "./_describe.ts"
import { complement } from '../mod.ts'
import { eq } from "./utils/utils.ts"



describe('complement', () => {
  it('should create boolean-returning function that reverses another', () => {
    const even = (x: number) => x % 2 === 0
    const f = complement(even)
    eq(f(8), false)
    eq(f(13), true)
  })

  it('should accept a function that take multiple parameters', () => {
    const between = (a: number, b: number, c: number) => a < b && b < c
    const f = complement(between)
    eq(f(4, 5, 11), false)
    eq(f(12, 2, 6), true)
  })

  // TODO:
  // it('should accept fantasy-land functors', () => {
  //   const Just = S.Just
  //   const Nothing = S.Nothing
  //   eq(complement(Just(true)), Just(false))
  //   eq(complement(Just(false)), Just(true))
  //   eq(complement(Nothing()), Nothing())
  // })

})
