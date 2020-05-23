import { describe, it, expect } from "./_describe.ts"
import map from './../map.ts'

function add3(a: number) {
  return 3 + a
}

describe('map on arrays', () => {
  it('should add 3 to all elements', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8]
    const arr2 = [...arr]
    const expected = [4, 5, 6, 7, 8, 9, 10, 11]
    expect(map(add3)(arr)).toEqual(expected)
    expect(arr).toEqual(arr2)
    expect(map(add3, arr)).toEqual(expected)
    expect(arr).toEqual(arr2)
  })
})

describe('map on objects', () => {
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

  it('should add 3 to all elements', () => {
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
})

describe('map on functions', () => {
  it('should add 3 to result of function1', () => {
    function function1(a: number, b: number) {
      return a * b + a % b
    }
    let a = 11
    let b = 3
    let result = add3(function1(a, b))
    expect(map(add3)(function1)(a, b)).toBe(result)
    expect(map(add3, function1)(a, b)).toBe(result)
    expect(map(add3, function1)(a)(b)).toBe(result)

    a = 0
    b = 1
    result = add3(function1(a, b))
    expect(map(add3)(function1)(a, b)).toBe(result)
    expect(map(add3, function1)(a, b)).toBe(result)
    expect(map(add3, function1)(a)(b)).toBe(result)
  })
})
