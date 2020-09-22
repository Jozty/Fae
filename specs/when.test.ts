import { describe, it } from './_describe.ts'
import { when, add, equals, multiply, _ } from '../mod.ts'
import { eq } from './utils/utils.ts'
import { isNumber } from '../utils/is.ts'
import type { Func } from '../utils/types.ts'

describe('when', () => {
  const add1 = add(1) as (a: number) => number
  function g(x: number) {
    return multiply(3)(x)
  }
  
  it('should call the whenTrue function if the validator returns a truthy value', () => {
    eq(when(isNumber, add1)(10), 11)
    eq(when(equals(_, 5), g)(5), 15)        
  })

  it('should return the argument unmodified if the validator returns a falsy value', () => {
    eq(when(isNumber, add1 as Func)('hello'), 'hello')
    eq(when(equals(_, 5), g)(10), 10)
  })

  it('should return a curried function', () => {
    const ifIsNumber = when(isNumber)
    eq(ifIsNumber(add(1))(15), 16)
    eq(ifIsNumber(add(1))('hello'), 'hello')
    eq(when(equals(_, 5))(g)(5), 15)
    eq(when(equals(_, 5), _, 5)(g), 15)
    eq(when(equals(_, 5), _, 5)(add1 as Func), 6)
  })
})
