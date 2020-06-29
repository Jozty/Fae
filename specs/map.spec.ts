import { describe, it, expect } from "./_describe.ts"
import { map, add, multiply, subtract, _ } from '../mod.ts'
import { eq } from "./utils/utils.ts"
import { Func } from "../utils/types.ts"

function add3(a: number) {
  return 3 + a
}

describe('map', () => {
  const obj = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    5: 6,
    12: 3,
    'abc': 13,
  }
  const obj2 = {...obj}
  const add1 = add(1)
  const times2 = multiply(2)
  const dec = subtract(_, 1)

  it('should add 3 to all elements on array', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8]
    const arr2 = [...arr]
    const expected = [4, 5, 6, 7, 8, 9, 10, 11]
    expect(map(add3)(arr)).toEqual(expected)
    expect(arr).toEqual(arr2)
    expect(map(add3, arr)).toEqual(expected)
    expect(arr).toEqual(arr2)
  })

  it('should add 3 to all elements of object', () => {
    const expected = {
      a: 4,
      b: 5,
      c: 6,
      d: 7,
      e: 8,
      5: 9,
      12: 6,
      'abc': 16,
    }
    expect(map(add3)(obj)).toEqual(expected)
    expect(obj).toEqual(obj2)
    expect(map(add3, obj)).toEqual(expected)
    expect(obj).toEqual(obj2)
  })

  it('should add 3 to result of function1', () => {
    function function1(a: number, b: number) {
      return a * b + a % b
    }
    let a = 11
    let b = 3
    let result = add3(function1(a, b))
    const m1 = map(add3)(function1) as Func
    const m2 = map(add3, function1) as Func
    expect(m1(a, b)).toBe(result)
    expect(m2(a, b)).toBe(result)
    expect(m2(a)(b)).toBe(result)

    a = 0
    b = 1
    result = add3(function1(a, b))
    expect(m1(a, b)).toBe(result)
    expect(m2(a, b)).toBe(result)
    expect(m2(a)(b)).toBe(result)
  })

  it('interprets ((->) r) as a functor', function() {
    const f = function(a: number) { return a - 1; }
    const g = function(b: number) { return b * 2; }
    const h = map(f, g) as (a: number) => number
    eq(h(10), (10 * 2) - 1)
  })

  it('composes', function() {
    const mdouble = map(times2 as (a: number) => number)
    const mdec = map(dec)
    eq(mdec(mdouble([10, 20, 30])), [19, 39, 59])
  });
})
