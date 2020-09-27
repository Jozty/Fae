import { describe, it } from './_describe.ts'
import { when, add, filter, equals, multiply, _ } from '../mod.ts'
import { eq } from './utils/utils.ts'
import { isNumber } from '../utils/is.ts'
import type { Func } from '../utils/types.ts'

describe('when', () => {
  const add1 = add(1) as (a: number) => number
  function g(x: number) {
    return multiply(3)(x)
  }

  let spec = { x: equals('foo'), y: equals(7) }
  let test1 = { x: 12, y: 200 }
  let test2 = { x: 'foo', y: 7 }
  const person1 = {
    firstname: 'Bob',
    lastname: 'Hanks',
  }

  const person2 = {
    firstname: 'Michael',
    lastname: 'Jordan',
  }

  const invoke = function (obj: {
    firstname: string
    lastname: string
  }) {
    return obj.firstname
  }

  const isEven = (n: number) => n % 2 === 0

  it('should call the whenTrue function if the validator returns a truthy value', () => {
    eq(when(isNumber, add1)(10), 11)
    eq(when(equals(_, 5), g)(5), 15)
    eq(when(equals(person1), invoke)(person1), 'Bob')
    eq(
      when(equals([1, 2, 4, 5, 6]))(filter(isEven))([1, 2, 4, 5, 6]),
      [2, 4, 6],
    )
  })

  it('should return the argument unmodified if the validator returns a falsy value', () => {
    eq(when(isNumber, add1 as Func)('hello'), 'hello')
    eq(when(equals(person1), invoke)(person2), {
      firstname: 'Michael',
      lastname: 'Jordan',
    })
    eq(
      when(equals([1, 2, 4, 5, 6]))(filter(isEven))([1, 2, 3, 5, 6]),
      [1, 2, 3, 5, 6],
    )
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
