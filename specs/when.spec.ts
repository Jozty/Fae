import { describe, it } from "./_describe.ts"
import { when, add } from '../mod.ts'
import { eq } from "./utils/utils.ts"
import { isNumber } from "../utils/is.ts"



describe('when', () => {
  it('should call the whenTrue function if the validator returns a truthy value', () => {
    // @ts-ignore check
    eq(when(isNumber, add(1))(10), 11)
  })

  it('should return the argument unmodified if the validator returns a falsy value', () => {
    eq(when(isNumber, add(1))('hello'), 'hello')
  })

  it('should return a curried function', () => {
    const ifIsNumber = when(isNumber)
    eq(ifIsNumber(add(1))(15), 16)
    eq(ifIsNumber(add(1))('hello'), 'hello')
  })
})