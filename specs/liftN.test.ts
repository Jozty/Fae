import { describe, it } from './_describe.ts'
import {
  liftN,
  reduce,
  curry,
  add,
  multiply,
  subtract,
  _,
} from '../mod.ts'
import { eq } from './utils/utils.ts'

function addN() {
  return reduce((a: number, b: number) => a + b, 0, arguments)
}

const add3 = curry(3, function (a: number, b: number, c: number) {
  return a + b + c
})

const gt = curry(2, (a: number, b: number) => a > b)
const lt = curry(2, (a: number, b: number) => a < b)

function and(a: number, b: number) {
  return a && b
}

describe('liftN', () => {
  const addN3 = liftN(3, addN)
  const addN4 = liftN(4, addN)
  const addN5 = liftN(5, addN)

  it('should return a function', () => {
    eq(typeof liftN(3, add3), 'function')
  })

  it('should limit a variadic function to the specified arity', () => {
    eq(addN3([1, 10], [2], [3]), [6, 15])
  })

  it('can lift functions of any arity', () => {
    eq(addN3([1, 10], [2], [3]), [6, 15])
    eq(addN4([1, 10], [2], [3], [40]), [46, 55])
    eq(addN5([1, 10], [2], [3], [40], [500, 1000]), [
      546,
      1046,
      555,
      1055,
    ])
  })

  // TODO:
  // it('should work with other functors such as "Maybe"', () => {
  //   const addM = liftN(2, add)
  //   eq(addM(Maybe.Just(3), Maybe.Just(5)), Maybe.Just(8))
  // })

  it('should interpret [a] as a functor', () => {
    eq(addN3([1, 2, 3], [10, 20], [100, 200, 300]), [
      111,
      211,
      311,
      121,
      221,
      321,
      112,
      212,
      312,
      122,
      222,
      322,
      113,
      213,
      313,
      123,
      223,
      323,
    ])
    eq(addN3([1], [2], [3]), [6])
    eq(addN3([1, 2], [10, 20], [100, 200]), [
      111,
      211,
      121,
      221,
      112,
      212,
      122,
      222,
    ])
  })

  it('should interprets ((->) r) as a functor', () => {
    const convergedOnInt = addN3(add(2), multiply(3), subtract(4))
    const convergedOnBool = liftN(2, and)(gt(_, 0), lt(_, 3))
    eq(typeof convergedOnInt, 'function')
    eq(typeof convergedOnBool, 'function')
    eq(convergedOnInt(10), 10 + 2 + 10 * 3 + (4 - 10))
    eq(convergedOnBool(0), 0 > 0 && 0 < 3)
    eq(convergedOnBool(1), 1 > 0 && 1 < 3)
    eq(convergedOnBool(2), 2 > 0 && 2 < 3)
    eq(convergedOnBool(3), 3 > 0 && 3 < 3)
  })
})
