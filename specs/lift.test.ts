import { describe, it } from './_describe.ts'
import { lift, curry, add, multiply, subtract, _ } from '../mod.ts'
import { eq } from './utils/utils.ts'

const add3 = curry(3, function (a: number, b: number, c: number) {
  return a + b + c
})
const add4 = curry(4, function (
  a: number,
  b: number,
  c: number,
  d: number,
) {
  return a + b + c + d
})
const add5 = curry(5, function (
  a: number,
  b: number,
  c: number,
  d: number,
  e: number,
) {
  return a + b + c + d + e
})

describe('lift', () => {
  const addN3 = lift(add3)
  const addN4 = lift(add4)
  const addN5 = lift(add5)

  it('should return a function', () => {
    eq(typeof lift(addN3), 'function')
  })

  it('should produces a cross-product of array values', function () {
    eq(addN3([1, 2, 3], [1, 2], [1, 2, 3]), [
      3,
      4,
      5,
      4,
      5,
      6,
      4,
      5,
      6,
      5,
      6,
      7,
      5,
      6,
      7,
      6,
      7,
      8,
    ])
    eq(addN3([1], [2], [3]), [6])
    eq(addN3([1, 2], [3, 4], [5, 6]), [9, 10, 10, 11, 10, 11, 11, 12])
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
})
